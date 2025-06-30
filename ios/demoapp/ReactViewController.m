#import "ReactViewController.h"
#import <RCTAppDependencyProvider.h>
#import <RCTDefaultReactNativeFactoryDelegate.h>
#import <RCTReactNativeFactory.h>
#import <React/RCTBundleURLProvider.h>

@interface ReactViewController ()

@end

@interface ReactNativeFactoryDelegate : RCTDefaultReactNativeFactoryDelegate
@end

@implementation ReactViewController {
  RCTReactNativeFactory *_factory;
  id<RCTReactNativeFactoryDelegate> _factoryDelegate;
}

- (void)viewDidLoad {
  NSLog(@"🚀 [iOS] ReactViewController viewDidLoad 开始");
  [super viewDidLoad];
  // Do any additional setup after loading the view.
  NSLog(@"🚀 [iOS] 创建 ReactNativeFactoryDelegate");
  _factoryDelegate = [ReactNativeFactoryDelegate new];
  _factoryDelegate.dependencyProvider = [RCTAppDependencyProvider new];
  NSLog(@"🚀 [iOS] 创建 RCTReactNativeFactory");
  _factory = [[RCTReactNativeFactory alloc] initWithDelegate:_factoryDelegate];
  NSLog(@"🚀 [iOS] 准备创建RN视图，模块名: HelloWorld");
  self.view = [_factory.rootViewFactory viewWithModuleName:@"HelloWorld"];
}

- (void)viewWillAppear:(BOOL)animated {
  NSLog(@"🚀 [iOS] ReactViewController viewWillAppear");
  [super viewWillAppear:animated];
}

- (void)viewDidAppear:(BOOL)animated {
  NSLog(@"🚀 [iOS] ReactViewController viewDidAppear");
  [super viewDidAppear:animated];
  NSLog(@"🚀 [iOS] 当前view: %@", self.view);
}

@end

@implementation ReactNativeFactoryDelegate

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge {
  NSLog(@"🌉 [iOS] sourceURLForBridge 被调用");
  return [self bundleURL];
}

- (NSURL *)bundleURL {
  NSLog(@"📦 [iOS] bundleURL 方法被调用");
#if DEBUG
  NSLog(@"📦 [iOS] DEBUG模式，使用开发服务器");

  // 首先尝试使用RCTBundleURLProvider
  NSURL *url =
      [RCTBundleURLProvider.sharedSettings jsBundleURLForBundleRoot:@"index"];
  NSLog(@"📦 [iOS] RCTBundleURLProvider返回的URL: %@", url);

  // 如果URL是nil，手动构造
  if (!url) {
    NSLog(@"❌ [iOS] RCTBundleURLProvider返回nil，使用手动构造的URL");

    // 尝试不同的主机地址
    NSArray *hosts = @[ @"localhost", @"127.0.0.1" ];
    for (NSString *host in hosts) {
      NSString *urlString = [NSString
          stringWithFormat:
              @"http://%@:8081/index.bundle?platform=ios&dev=true&minify=false",
              host];
      url = [NSURL URLWithString:urlString];
      NSLog(@"📦 [iOS] 尝试URL: %@", urlString);

      // 简单的连接测试（这里只是构造URL，实际连接会在后续进行）
      break; // 使用第一个URL
    }
  }

  NSLog(@"📦 [iOS] 最终使用的URL: %@", url);
  NSLog(@"📦 [iOS] URL字符串: %@", [url absoluteString]);

  return url;
#else
  NSLog(@"📦 [iOS] RELEASE模式，使用本地bundle");
  NSURL *url = [NSBundle.mainBundle URLForResource:@"main"
                                     withExtension:@"jsbundle"];
  NSLog(@"📦 [iOS] 本地bundle URL: %@", url);
  return url;
#endif
}

@end
