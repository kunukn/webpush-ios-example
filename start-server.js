'use strict'

var browserSync = require('browser-sync').create()

browserSync.init({
  server: './src',
  watch: true,
  open: true,
  port: 3033,
  https: {
    key: '.cert/key.pem',
    cert: '.cert/cert.pem',
  },
})
