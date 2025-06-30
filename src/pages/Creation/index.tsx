import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomNavigation from '../../components/BottomNavigation';

const Index = () => {
  const insets = useSafeAreaInsets();

  const handleAddStoryMachine = () => {
    // TODO: 实现添加故事机功能
    console.log('添加故事机');
  };

  const handleTabPress = (tab: string) => {
    // TODO: 实现导航功能
    console.log('切换到标签页:', tab);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* 渐变背景容器 */}
      <LinearGradient
        colors={['#1EAAFD', '#F6F7FB']}
        style={styles.gradientContainer}
        locations={[0, 1]}
      >
        {/* 头部标题 */}
        <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
          <Text style={styles.title}>{"Let's start your plush\ntoy design!"}</Text>
        </View>

        {/* 主要内容区域 */}
        <View style={styles.content}>
          {/* 机器人卡片 */}
          <View style={styles.robotContainer}>
            <View style={styles.robotCard}>
              {/* <Image
                source={require('../../img/story-machine@2x.png')}
                style={styles.robotImage}
                resizeMode="contain"
              /> */}
            </View>
          </View>

          {/* 提示文字 */}
          <Text style={styles.description}>
            {'还没有故事机，快添加一个吧！'}
          </Text>

          {/* 添加按钮 */}
          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddStoryMachine}
            activeOpacity={0.8}
          >
            <Text style={styles.addButtonText}>
              {'添加故事机'}
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* 底部导航栏 */}
      <BottomNavigation 
        activeTab="creation" 
        onTabPress={handleTabPress} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7FB',
  },
  gradientContainer: {
    flex: 1,
  },
  header: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 36,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 0,
  },
  robotContainer: {
    marginBottom: 32,
  },
  robotCard: {
    width: 343,
    height: 270,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(43, 43, 43, 0.05)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  robotImage: {
    width: 160,
    height: 160,
  },
  description: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
    marginTop: 24,
  },
  addButton: {
    backgroundColor: '#1EAAFD',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 25,
    shadowColor: '#1EAAFD',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default Index; 