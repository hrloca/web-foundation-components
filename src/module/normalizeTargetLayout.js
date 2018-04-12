export default target => ({
  contentOffset: {
    get x() {
      return target.scrollLeft
    },
    get y() {
      return target.scrollTop
    },
  },
  contentSize: {
    get height() {
      return target.scrollHeight
    },
    get width() {
      return target.scrollWidth
    },
  },
  layoutMeasurement: {
    get height() {
      return target.offsetHeight
    },
    get width() {
      return target.offsetWidth
    },
  },
  timeStamp: Date.now(),
})
