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

  let newUrl = event.notification.data.url
  if (newUrl.includes('?')) newUrl += '&utm_source=push'
  else newUrl += '?utm_source=push'

  const analyticsPromise = async () => {
    // You can save to your analytics fact that push was shown
    // fetch('https://your_backend_server.com/track_show?message_id=' + ..message_id);
  }

  // https://web-push-book.gauntface.com/common-notification-patterns/
  const urlToOpen = new URL(newUrl, self.location.origin).href
  const promiseFocusOrOpen = clients
    .matchAll({
      type: 'window',
      includeUncontrolled: true,
    })
    .then((windowClients) => {
      let matchingClient = null

      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i]
        if (windowClient.url === urlToOpen) {
          matchingClient = windowClient
          break
        }
      }

      if (matchingClient) {
        return matchingClient.focus()
      } else {
        return clients.openWindow(newUrl)
      }
    })

    const promiseChain = Promise.all([
      analyticsPromise,
      promiseFocusOrOpen,
    ])

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

  const analyticsPromise = async () => {
    // You can save to your analytics fact that push was shown
    // fetch('https://your_backend_server.com/track_show?message_id=' + ..message_id);
  }

  const promiseChain = Promise.all([
    analyticsPromise,
    self.registration.showNotification(pushData.title, pushData),
  ])

  event.waitUntil(promiseChain)
})

self.addEventListener('notificationclose', (event) => {
  console.debug('notificationclose', event)
})
