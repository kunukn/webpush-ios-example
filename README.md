# webpush-ios
WebPush for IOS sample code


## Generating VAPID key
```shell
npx web-push generate-vapid-keys --json

# will return something like
# {"publicKey":"BAwUJxIa7mJZMqu78T...","privateKey":"wH3Mire4Nr..."}
```


Resources:
- [Meet Web Push for Safari on developer.apple.com](https://developer.apple.com/videos/play/wwdc2022/10098/)
- [Vapid token standart](https://blog.mozilla.org/services/2016/08/23/sending-vapid-identified-webpush-notifications-via-mozillas-push-service/)
- [VAPID RFC standard](https://datatracker.ietf.org/doc/html/rfc8292)
- [Apple PUSH server response codes](https://developer.apple.com/documentation/usernotifications/sending_web_push_notifications_in_web_apps_and_browsers)
