import ScrollManager, { detectScrollElem } from './scrollManager'
import ResizeManager from './resizeManager'
import Observer from './../libs/Observer'
import normalizeTargetLayout from './normalizeTargetLayout'

export default class WindowManager {
  constructor() {
    this.scrollElm = detectScrollElem()
    this.layout = normalizeTargetLayout(this.scrollElm)
    this.body = window.document.body

    this.scroll = new ScrollManager(null, {
      passive: true,
      throttle: 100,
    })

    this.resize = new ResizeManager({
      throttle: 100,
    })

    this._scrollObserver = new Observer()
    this._scrollEndObserver = new Observer()
    this._resizeObserver = new Observer()

    this.scroll.onScroll((e, o) => this._scrollObserver.dispatch(e, o))
    this.scroll.onScrollEnd((e, o) => this._scrollEndObserver.dispatch(e, o))
    this.resize.onResize((e, o) => this._resizeObserver.dispatch(e, o))
  }

  set noScroll(state) {
    if (state) {
      this.scrollPos = this.scroll.info.contentOffset.y
      window.app.style.position = 'fixed'
      window.app.style.width = '100%'
      window.app.style.top = `-${this.scrollPos}px`
    } else {
      window.app.removeAttribute('style')
      this.scroll.top = this.scrollPos
    }
  }

  // register event handler
  onScroll(cb) {
    this._scrollObserver.register(cb)
  }
  onScrollEnd(cb) {
    this._scrollEndObserver.register(cb)
  }
  onResize(cb) {
    this._resizeObserver.register(cb)
  }

  // release event handler
  removeScroll(cb) {
    this._scrollObserver.release(cb)
  }
  removeScrollEnd(cb) {
    this._scrollEndObserver.release(cb)
  }
  removeResize(cb) {
    this._resizeObserver.release(cb)
  }
}
