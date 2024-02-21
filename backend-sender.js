/*
 Public part of VAPID key, generation of that covered in README
 All subscription tokens associated with that key, so if you change it - you may lose old subscribers
 You MUST need generate your own VAPID keys! npx web-push generate-vapid-keys
 Newer share your PRIVATE_VAPID_KEY. It should be stored in a safe storage. 
 The one used here or in .env file is a DEMO key.
*/

require('dotenv').config()
const webpush = require('web-push')

// CHANGE TO YOUR TOKEN FOR TEST!
// EDIT THE .env file

// Remeber the VAPID_PUBLIC_KEY must match the one in the frontend.js
webpush.setVapidDetails(
  process.env.WEBAPP_URL, // look in .env file.
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
)

// CHANGE TO YOUR TOKEN FOR TEST!
// EDIT THE .env file
// See in your browser, when you subscribe to push.
const pushSubscription = {
  endpoint: process.env.endpoint, // look in .env file.
  expirationTime: null,
  keys: {
    p256dh: process.env.p256dh,
    auth: process.env.auth,
  },
}

let pushData = JSON.stringify({
  title: 'From server: Push demo',
  body: 'Additional text with some description ' + new Date(),
  icon: 'https://kunukn.github.io/webpush-ios-example/images/favicon.png',
  image:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg/1920px-Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg',
  data: {
    url: 'https://kunukn.github.io/webpush-ios-example/success.html',
    message_id: 'your_internal_unique_message_id_for_tracking',
  },
})
webpush.sendNotification(pushSubscription, pushData)
