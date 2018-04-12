import raf from 'raf'
import Ticking from './ticking'

// ////////////////////////////////////////////////

const normalizeResizeEvent = target => ({
  size: {
    get width() {
      return target.innerWidth
    },
    get height() {
      return target.innerHeight
    },
  },
  get viewport() {
    return target.innerWidth
  },
  timeStamp: Date.now(),
})

export default class ResizeManager {
  constructor(opt = {}) {
    this.ticker = new Ticking({
      handler: (e) => {
        this._onResize(e, normalizeResizeEvent(window))
      },
      throttle: opt.throttle || 0,
    })

    window.addEventListener('resize', () => {
      raf(this.ticker.handle.bind(this.ticker))
    })

    this._onResize = () => {}
  }

  onResize(cb) {
    this._onResize = cb
  }
}
