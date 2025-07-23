/**
 * TalenpalApplication - 应用程序主入口类
 * 
 * 功能说明：
 * 1. React Native应用初始化和配置
 * 2. 全局上下文和屏幕参数管理
 * 3. 第三方SDK初始化（ThingHomeSdk、xUtils等）
 * 4. 全局下拉刷新组件配置
 * 5. 崩溃处理器初始化
 * 
 * 作者：Talenpal团队
 * 创建时间：2025年
 */
package com.talenpal.talenpalapp.app;

import android.app.Application;
import android.content.Context;
import android.content.Intent;
import android.util.DisplayMetrics;
import android.util.Log;

// SmartRefreshLayout相关导入 - 用于全局下拉刷新配置
import com.scwang.smart.refresh.footer.ClassicsFooter;
import com.scwang.smart.refresh.layout.SmartRefreshLayout;
import com.scwang.smart.refresh.layout.api.RefreshFooter;
import com.scwang.smart.refresh.layout.api.RefreshHeader;
import com.scwang.smart.refresh.layout.api.RefreshLayout;
import com.scwang.smart.refresh.layout.listener.DefaultRefreshFooterCreator;
import com.scwang.smart.refresh.layout.listener.DefaultRefreshHeaderCreator;

// 应用内部组件导入
import com.talenpal.talenpalapp.R;
import com.talenpal.talenpalapp.config.Constant;
import com.talenpal.talenpalapp.manager.ActManager;
import com.talenpal.talenpalapp.manager.LoginManager;
import com.talenpal.talenpalapp.ui.account.LoginActivity;
import com.talenpal.talenpalapp.util.CrashHandler;
import com.talenpal.talenpalapp.util.SharedPreferencesUtil;
import com.talenpal.talenpalapp.view.CustomRefreshHeader;

// ThingHomeSdk相关导入 - 智能家居SDK
import com.thingclips.smart.home.sdk.ThingHomeSdk;
import com.thingclips.smart.sdk.api.INeedLoginListener;
import com.talenpal.talenpalapp.BuildConfig;

// xUtils框架导入 - Android开发工具库
import org.xutils.x;

// React Native相关导入
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactHost;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactHost;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.facebook.soloader.SoLoader;
import com.facebook.react.soloader.OpenSourceMergedSoMapping;

import java.io.IOException;
import java.util.List;

/**
 * 应用程序主类，继承Application并实现ReactApplication接口
 * 负责应用的全局初始化和配置
 */
public class TalenpalApplication extends Application implements ReactApplication {

    /** 全局应用上下文 */
    public static Context context;

    /** 屏幕宽度像素值 */
    public static int widthPixels;

    /** 屏幕高度像素值 */
    public static int heightPixels;

    /** 日志标签 */
    public String TAG = getClass().getSimpleName();

    /**
     * React Native宿主配置
     * 配置JS包列表、主模块名称、开发者支持等
     */
    private final ReactNativeHost mReactNativeHost = new DefaultReactNativeHost(this) {
        @Override
        protected List<ReactPackage> getPackages() {
            // 返回自动链接的React Native包列表
            return new PackageList(this).getPackages();
        }

        @Override
        protected String getJSMainModuleName() {
            // 指定JS主入口文件名
            return "index";
        }

        @Override
        public boolean getUseDeveloperSupport() {
            // 根据构建配置决定是否启用开发者支持
            return BuildConfig.DEBUG;
        }

        @Override
        protected boolean isNewArchEnabled() {
            // 是否启用React Native新架构
            return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
        }

        @Override
        protected Boolean isHermesEnabled() {
            // 是否启用Hermes JS引擎
            return BuildConfig.IS_HERMES_ENABLED;
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public ReactHost getReactHost() {
        // 获取默认的React Host实例
        return DefaultReactHost.getDefaultReactHost(getApplicationContext(), getReactNativeHost());
    }

    @Override
    public void onCreate() {
        super.onCreate();

        // 初始化SoLoader，用于加载原生库
        try {
            SoLoader.init(this, OpenSourceMergedSoMapping.INSTANCE);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        // 如果启用了新架构，则加载新架构入口点
        if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
            DefaultNewArchitectureEntryPoint.load();
        }

        // 设置全局上下文
        this.context = getContext();

        // 初始化SharedPreferences工具类
        SharedPreferencesUtil.getInstance(context);

        // 初始化xUtils框架
        x.Ext.init(this);
        x.Ext.setDebug(false); // 关闭xUtils调试模式

        // 初始化崩溃处理器
        CrashHandler.getInstance().init(this.getContext());

        // 初始化ThingHomeSdk智能家居SDK
        ThingHomeSdk.init(this, Constant.THING_SMART_APPKEY, Constant.THING_SMART_SECRET);
        ThingHomeSdk.setDebugMode(false); // 关闭SDK调试模式

        // 设置需要登录监听器，当SDK检测到需要重新登录时触发
        ThingHomeSdk.setOnNeedLoginListener(new INeedLoginListener() {
            @Override
            public void onNeedLogin(Context context) {
                // 执行登出操作
                LoginManager.INSTANCE.outLogin();

                // 跳转到登录页面
                Intent intent = new Intent(context, LoginActivity.class);
                intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK);
                context.startActivity(intent);

                // 清除除登录页面外的所有Activity
                ActManager.getAppManager().clearAllExcept(LoginActivity.class);
            }
        });

        // 获取并保存屏幕参数信息
        DisplayMetrics dm = getResources().getDisplayMetrics();
        widthPixels = dm.widthPixels;
        heightPixels = dm.heightPixels;
        Log.d(TAG, "屏幕信息：" + "宽：" + widthPixels + "  高：" + heightPixels + " density：" + dm.density + "  densityDpi："
                + dm.densityDpi);
    }

    /**
     * 静态代码块 - 全局下拉刷新组件配置
     * 在类加载时执行，设置全局的刷新头部和底部样式
     */
    static {
        // 设置全局的Header构建器
        SmartRefreshLayout.setDefaultRefreshHeaderCreator(new DefaultRefreshHeaderCreator() {
            @Override
            public RefreshHeader createRefreshHeader(Context context, RefreshLayout layout) {
                // 可选：设置全局主题颜色
                // layout.setPrimaryColorsId(R.color.colorPrimary, android.R.color.white);
                return new CustomRefreshHeader(context);
            }
        });

        // 设置全局的Footer构建器
        SmartRefreshLayout.setDefaultRefreshFooterCreator(new DefaultRefreshFooterCreator() {
            @Override
            public RefreshFooter createRefreshFooter(Context context, RefreshLayout layout) {
                // 创建经典样式的底部刷新组件，设置图标大小为20dp
                return new ClassicsFooter(context).setDrawableSize(20);
            }
        });
    }

    /**
     * 获取当前应用上下文
     * 
     * @return 应用程序上下文
     */
    public Context getContext() {
        return this.getApplicationContext();
    }
}
