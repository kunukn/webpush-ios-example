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

const VAPID_PUBLIC_KEY =
  "BAH3lauXWHqFKjP5lYnhT2-EqUdOZoRS4GPiUfu3RXMdkVDGNzqxYqW8ZMZO7JcZGbpozpwpd5yZV0q6NxPuBuk";
const VAPID_PRIVATE_KEY = "zpSM0NtSvV1vWuy--8aPJxbXmeacQjih3lMBSJTGAIU";

// npm install web-push
const webpush = require("web-push");

webpush.setVapidDetails(
  "https://kunukn.github.io/webpush-ios-example/",
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

// CHANGE TO YOUR TOKEN FOR TEST!
// See in your browser, when you subscribe to push.
const pushSubscription = {
  endpoint:
    "https://wns2-am3p.notify.windows.com/w/?token=BQYAAADmR5m6%2fz9A4%2bfqtPsHYAV81rDc0Nl7u1kAt28cBRtIlbj2S5oaFSUus2HhwfJFt46liZjUGLzABwtTuRKvn%2fOUVPBJz%2fjdaSJ9Ascyj1ijt%2fZQvAaa6ErIZN7GctxgYswgHrd1DZgWZC2ErRayqD67IO7m9R%2fqkdEfozFn%2fg9FWpeYoZpVMPAUR%2fJasgpvP%2b%2b35JUimD4MDJNELzXT%2fknRukkgnQmkOPhOskdDuQrMpH6j6Sj9P2KYRKXHLmkrB43%2bOiqM3jGKebZZrOFN8avvTVVCNVNO1ro7mE5ZwPwP2gKVRpw3qUeyX%2buAJErqMeMr2zgSBHMCUONZ7q9oMu8A",
  expirationTime: null,
  keys: {
    p256dh:
      "BE1WxBGzQd-a5Vp4FI87MynQzH8dtDXpS8ph9DLm2UcbyE1mzR1vAr8R0GaVNhSqq-KjTLy1GKyu4QHZlkioRJU",
    auth: "hLwa9vsgvMAPJ3VEUyeP_A",
  },
};

let pushData = JSON.stringify({
  title: "From server: Push demo",
  body: "Additional text with some description " + Date.now(),
  icon: "https://kunukn.github.io/webpush-ios-example/images/favicon.png",
  image:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg/1920px-Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg",
  data: {
    url: "https://kunukn.github.io/webpush-ios-example/success.html",
    message_id: "your_internal_unique_message_id_for_tracking",
  },
});
webpush.sendNotification(pushSubscription, pushData);
