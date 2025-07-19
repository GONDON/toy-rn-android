package com.talenpal.talenpalapp.app;

import android.app.Application;
import android.content.Context;
import android.content.Intent;
import android.util.DisplayMetrics;
import android.util.Log;

import com.scwang.smart.refresh.footer.ClassicsFooter;
import com.scwang.smart.refresh.layout.SmartRefreshLayout;
import com.scwang.smart.refresh.layout.api.RefreshFooter;
import com.scwang.smart.refresh.layout.api.RefreshHeader;
import com.scwang.smart.refresh.layout.api.RefreshLayout;
import com.scwang.smart.refresh.layout.listener.DefaultRefreshFooterCreator;
import com.scwang.smart.refresh.layout.listener.DefaultRefreshHeaderCreator;
import com.talenpal.talenpalapp.R;
import com.talenpal.talenpalapp.config.Constant;
import com.talenpal.talenpalapp.manager.ActManager;
import com.talenpal.talenpalapp.manager.LoginManager;
import com.talenpal.talenpalapp.ui.account.LoginActivity;
import com.talenpal.talenpalapp.util.CrashHandler;
import com.talenpal.talenpalapp.util.SharedPreferencesUtil;
import com.talenpal.talenpalapp.view.CustomRefreshHeader;
import com.thingclips.smart.home.sdk.ThingHomeSdk;
import com.thingclips.smart.sdk.api.INeedLoginListener;

import org.xutils.x;

public class TalenpalApplication extends Application {
    public static Context context;
    public static int widthPixels;
    public static int heightPixels;
    public String TAG = getClass().getSimpleName();
    @Override
    public void onCreate() {
        super.onCreate();
        this.context = getContext();

        SharedPreferencesUtil.getInstance(context);
        x.Ext.init(this);
        x.Ext.setDebug(false);

        CrashHandler.getInstance().init(this.getContext());//捕获全局异常

        //初始化涂鸦
        ThingHomeSdk.init(this, Constant.THING_SMART_APPKEY, Constant.THING_SMART_SECRET);
        //日志
        ThingHomeSdk.setDebugMode(false);
        //登录过期监听
        ThingHomeSdk.setOnNeedLoginListener(new INeedLoginListener() {
            @Override
            public void onNeedLogin(Context context) {
                LoginManager.INSTANCE.outLogin();
                Intent intent = new Intent(context, LoginActivity.class);
                intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK);
                context.startActivity(intent);
                ActManager.getAppManager().clearAllExcept(LoginActivity.class);
            }
        });


        DisplayMetrics dm = getResources().getDisplayMetrics();
        widthPixels = dm.widthPixels;
        heightPixels = dm.heightPixels;
        Log.d(TAG,"屏幕信息："+"宽："+widthPixels+"  高："+heightPixels+" density："+dm.density+"  densityDpi："+dm.densityDpi);

    }

    static {
        //设置全局的Header构建器
        SmartRefreshLayout.setDefaultRefreshHeaderCreator(new DefaultRefreshHeaderCreator() {
            @Override
            public RefreshHeader createRefreshHeader(Context context, RefreshLayout layout) {
//                layout.setPrimaryColorsId(R.color.colorPrimary, android.R.color.white);//全局设置主题颜色
                return new CustomRefreshHeader(context);
            }
        });
        //设置全局的Footer构建器
        SmartRefreshLayout.setDefaultRefreshFooterCreator(new DefaultRefreshFooterCreator() {
            @Override
            public RefreshFooter createRefreshFooter(Context context, RefreshLayout layout) {
                return new ClassicsFooter(context).setDrawableSize(20);
            }
        });
    }

    /**
     * 获取当前上下文
     * @return
     */
    public Context getContext() {
        return this.getApplicationContext();
    }
}
