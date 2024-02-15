if (navigator.serviceWorker) {
    initServiceWorker();
}

async function initServiceWorker() {
    let swRegistration = await navigator.serviceWorker.register('https://kunukn.github.io/webpush-ios-example/serviceworker.js', {scope: '/webpush-ios-example/'})
    // let swRegistration = await navigator.serviceWorker.register('serviceworker.js', {scope: '/webpush-ios-example/'})
    let pushManager = swRegistration.pushManager;

    if (!isPushManagerActive(pushManager)) {
        return;
    }

    let permissionState = await pushManager.permissionState({userVisibleOnly: true});
    switch (permissionState) {
        case 'prompt':
            document.getElementById('subscribe_btn').style.display = 'block';
            break;
        case 'granted':
            displaySubscriptionInfo(await pushManager.getSubscription())
            break;
        case 'denied':
            document.getElementById('subscribe_btn').style.display = 'none';
            document.getElementById('active_sub').style.display = 'block';
            document.getElementById('active_sub').innerHTML = 'User denied push permission';
    }
}

function isPushManagerActive(pushManager) {
    if (!pushManager) {
        if (!window.navigator.standalone) {
            document.getElementById('add-to-home-screen').style.display = 'block';
        } else {
            throw new Error('PushManager is not active');
        }
        document.getElementById('subscribe_btn').style.display = 'none';
        return false;
    } else {
        return true;
    }
}

async function subscribeToPush() {
    // Public part of VAPID key, generation of that covered in README
    // All subscription tokens associated with that key, so if you change it - you may lose old subscribers

    /*
Public Key:
BAH3lauXWHqFKjP5lYnhT2-EqUdOZoRS4GPiUfu3RXMdkVDGNzqxYqW8ZMZO7JcZGbpozpwpd5yZV0q6NxPuBuk

Private Key: THIS IS DEMO key.
zpSM0NtSvV1vWuy--8aPJxbXmeacQjih3lMBSJTGAIU
    */
    const VAPID_PUBLIC_KEY = 'BAH3lauXWHqFKjP5lYnhT2-EqUdOZoRS4GPiUfu3RXMdkVDGNzqxYqW8ZMZO7JcZGbpozpwpd5yZV0q6NxPuBuk';
    

    let swRegistration = await navigator.serviceWorker.getRegistration();
    let pushManager = swRegistration.pushManager;
    if (!isPushManagerActive(pushManager)) {
        return;
    }
    let subscriptionOptions = {
        userVisibleOnly: true,
        applicationServerKey: VAPID_PUBLIC_KEY
    };
    try {
        let subscription = await pushManager.subscribe(subscriptionOptions);
        displaySubscriptionInfo(subscription);
        // Here you can send fetch request with subscription data to your backend API for next push sends from there
    } catch (error) {
        document.getElementById('active_sub').style.display = 'block';
        document.getElementById('active_sub').innerHTML = 'User denied push permission';
    }
}

function displaySubscriptionInfo(subscription) {
    document.getElementById('subscribe_btn').style.display = 'none';
    document.getElementById('active_sub').style.display = 'block';
    document.getElementById('active_sub').innerHTML = '<h3>Active subscription:</h3>'
       + '<textarea style="width: 100%; min-height: 140px;">' + JSON.stringify(subscription.toJSON()) + '</textarea>';
    document.getElementById('test_send_btn').style.display = 'block';
}

function testSend() {
    const title = "Push title";
    const options = {
        body: "Additional text with some description",
        icon: "https://kunukn.github.io/webpush-ios-example/images/push_icon.jpg",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg/1920px-Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg",
        data: {
            "url": "https://kunukn.github.io/webpush-ios-example/success.html",
            "message_id": "your_internal_unique_message_id_for_tracking"
        },
    };
    navigator.serviceWorker.ready.then(async function (serviceWorker) {
        await serviceWorker.showNotification(title, options);
    });
}
