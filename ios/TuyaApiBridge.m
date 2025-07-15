
#import "TuyaApiBridge.h"
#import <React/RCTLog.h>
#import <ThingSmartHomeKit/ThingSmartKit.h>

@implementation TuyaApiBridge

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(loginWithEmail : (NSDictionary *)loginParams resolver : (
    RCTPromiseResolveBlock)resolve rejecter : (RCTPromiseRejectBlock)reject) {
  NSString *email = [loginParams objectForKey:@"email"];
  NSString *password = [loginParams objectForKey:@"password"];
  NSString *countryCode = [loginParams objectForKey:@"countryCode"];

  if (!email || !password || !countryCode) {
    reject(@"param_error", @"Email, password, and countryCode are required.",
           nil);
    return;
  }

  [[ThingSmartUser sharedInstance] loginByEmail:countryCode
      email:email
      password:password
      success:^{
        resolve(@YES);
      }
      failure:^(NSError *error) {
        reject(@"login_error", error.localizedDescription, error);
      }];
}

RCT_EXPORT_METHOD(apiRequest : (NSDictionary *)params resolver : (
    RCTPromiseResolveBlock)resolve rejecter : (RCTPromiseRejectBlock)reject) {
  NSString *apiName = [params objectForKey:@"a"];
  NSString *apiVersion = [params objectForKey:@"v"];
  NSDictionary *postData = [params objectForKey:@"postData"];

  if (!apiName) {
    reject(@"Error", @"API name (a) is required", nil);
    return;
  }

  if (!apiVersion) {
    // Default to 1.0 if not provided
    apiVersion = @"1.0";
  }

  [[ThingSmartRequest new] requestWithApiName:apiName
      postData:postData
      version:apiVersion
      success:^(id result) {
        resolve(result);
      }
      failure:^(NSError *error) {
        reject(@"api_error", error.localizedDescription, error);
      }];
}

@end