#import "ReactViewController.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@interface ReactViewController ()

@end

@implementation ReactViewController

- (void)viewDidLoad {
  NSLog(@"🚀 [iOS] ReactViewController viewDidLoad 开始");
  [super viewDidLoad];

  NSLog(@"🚀 [iOS] 创建 RCTRootView");
  NSURL *jsCodeLocation =
      [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];

  RCTRootView *rootView = [[RCTRootView alloc]
      initWithBundleURL:jsCodeLocation
             moduleName:@"HelloWorld"
      initialProperties:@{@"userID" : @"12345678", @"token" : @"secretToken"}
          launchOptions:nil];

  rootView.backgroundColor = [UIColor whiteColor];
  self.view = rootView;

  NSLog(@"🚀 [iOS] ReactViewController 初始化完成");
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
