import fs from 'fs'

const filename = '.env'
fs.access(filename, fs.F_OK, (err) => {
  if (err) {
    const content = `
WEBAPP_URL=https://kunukn.github.io/webpush-ios-example/
VAPID_PUBLIC_KEY=BAvWyGQoQQWGpJvphhz0Smag_nNLXrzbk7W1vO9x-KU9bg3aMyUD5ceR3jqRM8XhX_godkXh2GC8rHY4Rb59J54
VAPID_PRIVATE_KEY=bCC48nHLpN29iJVj8uYdzqgGQDvHt7fQcvnjMnzvHkU
endpoint=https://wns2-am3p.notify.windows.com/w/?token=BQYA...
p256dh=BCrIP1XiXcIIzTb519oDwK6...
auth=kOSNuBRqV...
`
    fs.writeFile(filename, content, (err) => {
      if (err) {
        console.error(err)
        return
      }
      console.log('.env file was created')
    })
  }
})
