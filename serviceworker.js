self.addEventListener('notificationclick', (event) => {
  console.debug('notificationclick', event)

  event.notification.close()

  if (!event.notification.data) {
    console.error(
      'Click on WebPush with empty data, where url should be. Notification: ',
      event.notification
    )
    return
  }
  if (!event.notification.data.url) {
    console.error(
      'Click on WebPush without url. Notification: ',
      event.notification
    )
    return
  }

  let url = new URL(event.notification.data.url)
  url.searchParams.append('utm_source', 'push')
  let newUrl = url.toString()

  let promiseChain = clients.openWindow(event.notification.data.url)
  event.waitUntil(promiseChain)
})

self.addEventListener('push', (event) => {
  console.debug('push', event)

  // PushData keys structure standart https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification
  let pushData = event.data.json()
  if (!pushData || !pushData.title) {
    console.error(
      'Received WebPush with an empty title. Received body: ',
      pushData
    )
  }

  event.waitUntil(async () => {
    await self.registration.showNotification(pushData.title, pushData)

    // You can save to your analytics fact that push was shown
    // fetch('https://your_backend_server.com/track_show?message_id=' + pushData.data.message_id);
  })
})

self.addEventListener('notificationclose', (event) => {
  console.debug('notificationclose', event)
})
