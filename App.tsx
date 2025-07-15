/*
 * @LastEditors: jizai jizai.zhu@tuya.com
 * @Date: 2025-06-22 16:33:33
 * @LastEditTime: 2025-07-15 17:03:05
 * @FilePath: /demoapp/App.tsx
 * @Description: 
 */
// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Creation from './src/pages/Creation';
import AddDoll from './src/pages/AddDoll';
import StoryMachinePanel from './src/pages/StoryMachinePanel';
import DollPanel from './src/pages/DollPanel';

const RootStack = createNativeStackNavigator({
  initialRouteName: 'DollPanel',
  screens: {
    Home: {
      screen: Creation,
      options: {
        headerShown: false,
      },
    },
    AddDoll: {
      screen: AddDoll,
      options: {
        headerShown: false,
      },
    },
    StoryMachinePanel: {
      screen: StoryMachinePanel,
      options: {
        headerShown: false,
      },
    },
    DollPanel: {
      screen: DollPanel,
      options: {
        headerShown: false,
      },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
}