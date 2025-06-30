#import "ViewController.h"
#import "ReactViewController.h"

@interface ViewController ()

@end

@implementation ViewController {
  ReactViewController *reactViewController;
}

- (void)viewDidLoad {
  [super viewDidLoad];
  // Do any additional setup after loading the view.
  self.view.backgroundColor = UIColor.systemBackgroundColor;
  UIButton *button = [UIButton new];
  [button setTitle:@"Open React Native123" forState:UIControlStateNormal];
  [button setTitleColor:UIColor.systemBlueColor forState:UIControlStateNormal];
  [button setTitleColor:UIColor.blueColor forState:UIControlStateHighlighted];
  [button addTarget:self
                action:@selector(presentReactNative)
      forControlEvents:UIControlEventTouchUpInside];
  [self.view addSubview:button];

  button.translatesAutoresizingMaskIntoConstraints = NO;
  [NSLayoutConstraint activateConstraints:@[
    [button.leadingAnchor constraintEqualToAnchor:self.view.leadingAnchor],
    [button.trailingAnchor constraintEqualToAnchor:self.view.trailingAnchor],
    [button.centerYAnchor constraintEqualToAnchor:self.view.centerYAnchor],
    [button.centerXAnchor constraintEqualToAnchor:self.view.centerXAnchor],
  ]];
}

- (void)presentReactNative {
  if (reactViewController == NULL) {
    //
    NSLog(@"进来了");
    reactViewController = [ReactViewController new];
    // 设置为全屏模式
    reactViewController.modalPresentationStyle = UIModalPresentationFullScreen;
  }
  [self presentViewController:reactViewController animated:YES completion:nil];
}

@end
