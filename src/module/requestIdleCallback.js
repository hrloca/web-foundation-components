// https://developers.google.com/web/updates/2015/08/using-requestidlecallback

window.requestIdleCallback =
  window.requestIdleCallback ||
  ((cb) => {
    const start = Date.now()
    return setTimeout(() => {
      cb({
        didTimeout: false,
        timeRemaining() {
          return Math.max(0, 50 - (Date.now() - start))
        },
      })
    }, 200)
  })

window.cancelIdleCallback = window.cancelIdleCallback || (id => clearTimeout(id))
