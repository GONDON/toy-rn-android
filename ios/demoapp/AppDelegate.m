//
//  AppDelegate.m
//  ThingAppSDKSample-iOS-ObjC
//
//  Copyright (c) 2014-2021 Thing Inc. (https://developer.tuya.com/)

#import "AppDelegate.h"
#import "AppKey.h"
#import "SVProgressHUD.h"

@interface AppDelegate ()

@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application
    didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  NSLog(@"🚀 [iOS] AppDelegate didFinishLaunchingWithOptions 开始");

  // Initialize ThingSmartSDK
  NSLog(@"🚀 [iOS] 初始化 ThingSmartSDK");
  [[ThingSmartSDK sharedInstance] startWithAppKey:APP_KEY
                                        secretKey:APP_SECRET_KEY];

// Enable debug mode, which allows you to see logs.
#ifdef DEBUG
  NSLog(@"🚀 [iOS] 启用调试模式");
  [[ThingSmartSDK sharedInstance] setDebugMode:YES];
#else
#endif

  [SVProgressHUD setDefaultStyle:SVProgressHUDStyleDark];
  self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
  NSLog(@"🚀 [iOS] 创建主窗口: %@", self.window);

  // 移除iOS 13+的Scene Delegate检查，统一使用AppDelegate处理
  if ([ThingSmartUser sharedInstance].isLogin) {
    NSLog(@"🚀 [iOS] 用户已登录，加载 ThingSmartMain storyboard");
    UIStoryboard *mainStoryboard =
        [UIStoryboard storyboardWithName:@"ThingSmartMain" bundle:nil];
    UINavigationController *nav =
        [mainStoryboard instantiateInitialViewController];
    self.window.rootViewController = nav;
  } else {
    NSLog(@"🚀 [iOS] 用户未登录，加载 Main storyboard");
    UIStoryboard *mainStoryboard = [UIStoryboard storyboardWithName:@"Main"
                                                             bundle:nil];
    UINavigationController *nav =
        [mainStoryboard instantiateInitialViewController];
    self.window.rootViewController = nav;
  }

  NSLog(@"🚀 [iOS] 设置rootViewController: %@", self.window.rootViewController);
  [self.window makeKeyAndVisible];
  NSLog(@"🚀 [iOS] AppDelegate didFinishLaunchingWithOptions 完成");

  return YES;
}

@end