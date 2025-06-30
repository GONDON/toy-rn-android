import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import BottomNavigation from '../../components/BottomNavigation';

const Index = () => {

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
      <StatusBar barStyle="light-content" backgroundColor="#4A9EFF" />
      
      {/* 头部渐变背景 */}
      <View style={styles.header}>
        <Text style={styles.title}>{'111'}</Text>
      </View>


      {/* 主要内容区域 */}
      <View style={styles.content}>
        {/* 机器人图标 */}
        <View style={styles.robotContainer}>
          <View style={styles.robotCard}>
            {/* <Image
              source={require('../../../src/img/story-machine@2x.png')}
              style={styles.robotImage}
              resizeMode="contain"
            /> */}
          </View>
        </View>

        {/* 提示文字 */}
        <Text style={styles.description}>
          {'333'}
        </Text>

        {/* 添加按钮 */}
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddStoryMachine}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>
            {('444')}
          </Text>
        </TouchableOpacity>
      </View>

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
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#4A9EFF',
    paddingHorizontal: 20,
    paddingTop: 60, // 增加顶部间距以适应状态栏
    paddingBottom: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 32,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  robotContainer: {
    marginBottom: 40,
  },
  robotCard: {
    width: 200,
    height: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  robotImage: {
    width: 120,
    height: 120,
  },
  description: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  addButton: {
    backgroundColor: '#4A9EFF',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 25,
    shadowColor: '#4A9EFF',
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