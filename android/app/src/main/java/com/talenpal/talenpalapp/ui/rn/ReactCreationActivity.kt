package com.talenpal.talenpalapp.ui.rn

import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

/** React Native宿主Activity，用于承载React Native组件 当用户点击Creation标签时启动此Activity */
class ReactCreationActivity : ReactActivity() {

    companion object {
        const val EXTRA_SOURCE_TAB = "source_tab"
        const val SOURCE_CREATION_TAB = "creation"
    }

    /** 返回要加载的React Native组件名称 使用app.json中注册的应用名称 */
    override fun getMainComponentName(): String = "TelpanpalApp"

    /** 创建React Activity代理，用于处理React Native的生命周期 */
    override fun createReactActivityDelegate(): ReactActivityDelegate {
        return object : DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled) {
            override fun getLaunchOptions(): Bundle? {
                val bundle = Bundle()

                // 传递来源标签信息给React Native组件
                val sourceTab = intent.getStringExtra(EXTRA_SOURCE_TAB) ?: ""
                bundle.putString("sourceTab", sourceTab)

                return bundle
            }
        }
    }

    /** 处理返回按键，返回到MainActivity */
    @Deprecated("Deprecated in Java")
    override fun onBackPressed() {
        super.onBackPressed()
        // 可以在这里添加自定义的返回逻辑
        finish()
    }
}
