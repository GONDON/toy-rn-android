
#import <React/RCTBridgeModule.h>

@interface TuyaApiBridge : NSObject <RCTBridgeModule>

// No need to declare methods here when using RCT_EXPORT_METHOD
// React Native's macro magic handles it.
// The issue was in the .m file's syntax.

@end