// Public part of VAPID key, generation of that covered in README
// All subscription tokens associated with that key, so if you change it - you may lose old subscribers
// You MUST need generate your own VAPID keys!
// Newer share your PRIVATE_VAPID_KEY. It should be stored in a safe storage. The one used here is a DEMO key.

/*
Public Key:
BAH3lauXWHqFKjP5lYnhT2-EqUdOZoRS4GPiUfu3RXMdkVDGNzqxYqW8ZMZO7JcZGbpozpwpd5yZV0q6NxPuBuk

Private Key: THIS IS DEMO key.
zpSM0NtSvV1vWuy--8aPJxbXmeacQjih3lMBSJTGAIU
    */

const webpush = require('web-push')

const VAPID_PUBLIC_KEY =
  'BAH3lauXWHqFKjP5lYnhT2-EqUdOZoRS4GPiUfu3RXMdkVDGNzqxYqW8ZMZO7JcZGbpozpwpd5yZV0q6NxPuBuk'
const VAPID_PRIVATE_KEY = 'zpSM0NtSvV1vWuy--8aPJxbXmeacQjih3lMBSJTGAIU'

// npm install web-push

webpush.setVapidDetails(
  'https://kunukn.github.io/webpush-ios-example/',
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
)

// CHANGE TO YOUR TOKEN FOR TEST!
// See in your browser, when you subscribe to push.
const pushSubscription = {
  endpoint:
    'https://web.push.apple.com/QOIx5p4FH2bt39manO861lMX4XlO8W...',
  keys: {
    p256dh:
      'BMvgoP9PHT4i_APyN2H0X8w7ZOFfFh9RoDYovXKLh3SBwLbO9pZvCgKBn1oElFwrG32Bj-r..',
    auth: 'bsRhyYVQGczYYS06XM-..',
  },
}

let pushData = JSON.stringify({
  title: 'From server: Push demo',
  body: 'Additional text with some description ' + Date.now(),
  icon: 'https://kunukn.github.io/webpush-ios-example/images/favicon.png',
  image:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg/1920px-Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg',
  data: {
    url: 'https://kunukn.github.io/webpush-ios-example/success.html',
    message_id: 'your_internal_unique_message_id_for_tracking',
  },
})
webpush.sendNotification(pushSubscription, pushData)
