import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  ImageBackground,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import SettingsPanel from './SettingsPanel';
import SleepPanel from './SleepPanel';

const StoryMachinePanel = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('sleep'); // 当前激活的tab
  const isSleepTab = activeTab === 'sleep';

  // 处理关闭页面
  const handleClose = () => {
    navigation.goBack();
  };

  // 处理底部标签切换
  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <View style={[styles.container, isSleepTab && { backgroundColor: '#1A1A1A' }]}>
      <StatusBar barStyle={isSleepTab ? 'light-content' : 'dark-content'} backgroundColor="transparent" translucent />
      
      <View style={{ flex: 1 }}>
        {!isSleepTab && (
          <Image
            source={require('../../img/profile-avatar-background.png')}
            style={StyleSheet.absoluteFillObject}
            resizeMode="cover"
          />
        )}
        {/* 顶部标题栏 */}
        <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
          <View style={styles.headerContent}>
            <Text style={[styles.title, isSleepTab && { color: '#FFF' }]}>Ai 故事机</Text>
            <View style={styles.headerButtons}>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={handleClose}
                activeOpacity={0.7}
              >
                <Image 
                  source={isSleepTab ? require('../../img/light-close.png') : require('../../img/popup-close.png')}
                  style={styles.closeIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* 内容区域 */}
        {activeTab === 'settings' ? <SettingsPanel /> : <SleepPanel />}

        {/* 底部导航栏 */}
        <View style={[styles.bottomNavigation, isSleepTab && styles.bottomNavigationDark]}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'settings' && styles.activeTabButton,
              isSleepTab && activeTab === 'settings' && styles.activeTabButtonDark,
            ]}
            onPress={() => handleTabPress('settings')}
            activeOpacity={0.7}
          >
            <Image
              source={require('../../img/settings.png')}
              style={styles.tabIcon}
            />
            <Text style={[
              styles.tabLabel,
              isSleepTab && styles.tabLabelDark,
              activeTab === 'settings' && styles.activeTabLabel,
              isSleepTab && activeTab === 'settings' && styles.activeTabLabelDark,
            ]}>设置</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'sleep' && styles.activeTabButton,
              isSleepTab && activeTab === 'sleep' && styles.activeTabButtonDark,
            ]}
            onPress={() => handleTabPress('sleep')}
            activeOpacity={0.7}
          >
            <Image
              source={require('../../img/sleep.png')}
              style={styles.tabIcon}
            />
            <Text style={[
              styles.tabLabel,
              isSleepTab && styles.tabLabelDark,
              activeTab === 'sleep' && styles.activeTabLabel,
              isSleepTab && activeTab === 'sleep' && styles.activeTabLabelDark,
            ]}>睡眠</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7FB',
  },
  backgroundImage: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    width: 24,
    height: 24,
  },
  bottomNavigation: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingBottom: 20,
    paddingHorizontal: 30,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomNavigationDark: {
    backgroundColor: '#000000',
    borderTopColor: '#222',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  activeTabButton: {
    backgroundColor: '#F6F7FB',
  },
  activeTabButtonDark: {
    backgroundColor: '#2C2C2E',
  },
  tabIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 14,
    color: '#666666',
  },
  tabLabelDark: {
    color: '#888',
  },
  activeTabLabel: {
    color: '#1EAAFD',
    fontWeight: '500',
  },
  activeTabLabelDark: {
    color: '#FFFFFF',
  },
});

export default StoryMachinePanel;
