let id = 0
const requests = {}

const imageLoader = {
  getSize(uri, success) {
    let complete = false
    /* eslint-disable */
    const interval = setInterval(callback, 16)
    const requestId = imageLoader.load(uri, callback, callback)
    function callback() {
      const image = requests[`${requestId}`]
      if (image) {
        const { naturalHeight, naturalWidth } = image
        if (naturalHeight && naturalWidth) {
          success(naturalWidth, naturalHeight)
          complete = true
        }
      }
      if (complete) {
        imageLoader.abort(requestId)
        clearInterval(interval)
      }
    }
  },

  checkLoaded(imageDom) {
    if (imageDom) {
      const { naturalHeight, naturalWidth } = imageDom
      if (naturalHeight && naturalWidth) {
        return true
      }
      return false
    }
  },

  prefetch(uri) {
    return new Promise((resolve, reject) => {
      imageLoader.load(uri, resolve, reject)
    })
  },

  abort(requestId) {
    let image = requests[`${requestId}`]
    if (image) {
      image.onerror = null
      image.onload = null
      image = null
      delete requests[`${requestId}`]
    }
  },

  load(uri, onLoad, onError) {
    id += 1
    const image = new Image()
    image.onerror = onError
    image.onload = onLoad
    image.src = uri
    requests[`${id}`] = image
    return id
  },
}

export default imageLoader
