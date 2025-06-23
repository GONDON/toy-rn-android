/*
 * @LastEditors: jizai jizai.zhu@tuya.com
 * @Date: 2025-06-22 16:33:13
 * @LastEditTime: 2025-06-23 11:57:12
 * @FilePath: /demoapp/index.js
 * @Description: 
 */
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

console.log('📱 [RN] index.js 开始执行');
console.log('📱 [RN] 应用名称:', appName);
console.log('📱 [RN] App组件:', App);

// 包装App组件，添加更多日志
const WrappedApp = () => {
  console.log('📱 [RN] WrappedApp 开始渲染');
  try {
    return App();
  } catch (error) {
    console.error('📱 [RN] App组件渲染出错:', error);
    throw error;
  }
};

console.log('📱 [RN] 准备注册组件:', appName);
AppRegistry.registerComponent(appName, () => WrappedApp);
console.log('📱 [RN] 组件注册完成:', appName);