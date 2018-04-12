/*
 * ViewportManager
 * (client only)
 * */
import ResizeManager from './resizeManager'
import Observer from './../libs/Observer'

const defaultMap = {
  320: 'mobile_s',
  375: 'mobile_m',
  425: 'mobile_l',
  768: 'tablet',
  1024: 'laptop_m',
  1440: 'laptop_l',
}

const resizer = new ResizeManager({
  throttle: 100,
})

const sortBreakPoint = object =>
  Object.keys(object)
    .map(Number)
    .sort((a, b) => a - b)

export default class ViewportManager {
  constructor(map = defaultMap) {
    this.map = map
    this.breakpoints = sortBreakPoint(this.map).reverse()
    this.viewport = this.getCurrentViewport()
    this.handler = []
    this.updateViewport()
    this.observer = new Observer()
    resizer.onResize(() => {
      this.updateViewport()
    })
  }

  onUpdate(cb) {
    this.observer.register(cb)
    cb(this.viewport)
  }

  removeUpdate(cb) {
    this.observer.release(cb)
  }

  updateViewport() {
    const prevViewport = this.viewport
    const nextViewport = this.getCurrentViewport()
    if (!nextViewport.value) return
    this.viewport = nextViewport
    if (prevViewport.value === this.viewport.value) return
    this.observer.dispatch(this.getCurrentViewport())
  }

  getCurrentViewport() {
    const windowWidth = window.innerWidth
    const current = this.breakpoints.find(v => windowWidth >= v) || Object.keys(this.map)[0]
    return {
      label: this.map[current],
      value: current,
      windowWidth,
    }
  }
}
