// Public part of VAPID key, generation of that covered in README
// All subscription tokens associated with that key, so if you change it - you may lose old subscribers
// You MUST need generate your own VAPID keys!
// Newer share your PRIVATE_VAPID_KEY. It should be stored in a safe storage

    /*
Public Key:
BAH3lauXWHqFKjP5lYnhT2-EqUdOZoRS4GPiUfu3RXMdkVDGNzqxYqW8ZMZO7JcZGbpozpwpd5yZV0q6NxPuBuk

Private Key: THIS IS DEMO key.
zpSM0NtSvV1vWuy--8aPJxbXmeacQjih3lMBSJTGAIU
    */

const VAPID_PUBLIC_KEY = "BAH3lauXWHqFKjP5lYnhT2-EqUdOZoRS4GPiUfu3RXMdkVDGNzqxYqW8ZMZO7JcZGbpozpwpd5yZV0q6NxPuBuk"
const VAPID_PRIVATE_KEY = "zpSM0NtSvV1vWuy--8aPJxbXmeacQjih3lMBSJTGAIU";


// npm install web-push
const webpush = require('web-push');



webpush.setVapidDetails(
    'https://kunukn.github.io/webpush-ios-example/',
    VAPID_PUBLIC_KEY,
    VAPID_PRIVATE_KEY
);

// CHANGE TO YOUR TOKEN FOR TEST
const pushSubscription = {
        "endpoint": "https://fcm.googleapis.com/fcm/send/fXbyGY04zHY:APA91bE-EZI...",
        "expirationTime": null,
        "keys": {
            "p256dh": "BHqcQRz0HXwdZXZOT5GkQC_d5P1XFcevTkNPuJqh...",
            "auth": "o3SJkOwZFr7deVnT98..."
        }
    }
;

let pushData = JSON.stringify({
    "title": "Push title",
    "body": "Additional text with some description",
    "icon": "https://kunukn.github.io/webpush-ios-example/images/favicon.png",
    "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg/1920px-Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg",
    "data": {
        "url": "https://kunukn.github.io/webpush-ios-example/success.html",
        "message_id": "your_internal_unique_message_id_for_tracking"
    }
});
webpush.sendNotification(pushSubscription, pushData);
