/*
 * @LastEditors: jizai jizai.zhu@tuya.com
 * @Date: 2025-06-22 17:03:50
 * @LastEditTime: 2025-06-23 11:23:57
 * @FilePath: /demoapp/metro.config.js
 * @Description: 
 */
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);