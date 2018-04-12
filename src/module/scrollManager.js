import raf, { cancel } from 'raf'
import Ticking from './ticking'
import Tween from './tween'
import eopt from './eventListenerOption'
import normalizeTargetLayout from './normalizeTargetLayout'

export const detectScrollElem = () => {
  if (document.scrollingElement) {
    return document.scrollingElement
  }

  if (!window.chrome && 'WebkitAppearance' in document.documentElement.style) {
    return document.body
  }
  return document.documentElement
}

export default class ScrollManager {
  constructor(el, opt = {}) {
    this.eoptResolver = eopt()
    this.elm = el || detectScrollElem()
    this.target = el || document
    this.eventOption = this.eoptResolver({ passive: opt.passive })
    this.ticker = new Ticking({
      handler: (e) => {
        this._onScroll(e, normalizeTargetLayout(this.elm))
      },
      handlerEnd: (e) => {
        this._onScrollEnd(e, normalizeTargetLayout(this.elm))
      },
      throttle: opt.throttle || 0,
    })

    this.target.addEventListener(
      'scroll',
      (e) => {
        raf(this.ticker.handle.bind(this.ticker, e))
      },
      this.eventOption,
    )

    // ////////////////////////////////////////////////

    this._onScroll = () => {}
    this._onScrollEnd = () => {}
  }

  onScroll(cb) {
    this._onScroll = cb
  }

  onScrollEnd(cb) {
    this._onScrollEnd = cb
  }

  get info() {
    return normalizeTargetLayout(this.elm)
  }

  get top() {
    return this.elm.scrollTop
  }

  set top(pos) {
    this.elm.scrollTop = pos
  }

  to(x = 0, y = 0, animated = false) {
    if (animated) {
      const tw = new Tween({ x: this.elm.scrollLeft, y: this.elm.scrollTop })
        .ease([0.4, 0.0, 0.2, 1])
        .to({ x, y })
        .duration(400)

      let req
      tw.regist((o) => {
        this.elm.scrollTop = o.y
        this.elm.scrollLeft = o.x
      })

      tw.on('end', () => cancel(req))

      const anim = () => {
        req = raf(anim)
        tw.update()
      }
      req = raf(anim)
    } else {
      this.elm.scrollTop = y
      this.elm.scrollLeft = x
    }
  }

  preventableScrollEvent(handler) {
    return (e) => {
      if (!this.props.scrollEnabled) {
        e.preventDefault()
      } else if (handler) {
        handler(e)
      }
    }
  }
}
