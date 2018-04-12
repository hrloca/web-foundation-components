import raf from 'raf'
import debounce from 'debounce'

// ////////////////////////////////////////////////

export default class Ticking {
  constructor(opt = {}) {
    this._state = {
      isChanging: false,
      lastTick: 0,
      ticking: false,
    }

    this.handler = opt.handler || (() => {})
    this.handlerEnd = opt.handlerEnd
    this.handlerStart = opt.handlerStart
    this.eventThrottle = opt.throttle || 0
    this._debouncedOnEnd = debounce(this._handleEnd, 100)
  }

  handle(e) {
    this._requestTick(e)
  }

  // ////////////////////////////////////////////////

  _handleEnd(e) {
    this._state.isChanging = false
    this.handler(e)
    if (this.handlerEnd) this.handlerEnd(e)
  }

  _handleStart(e) {
    this._state.lastTick = Date.now()
    this._state.isChanging = true
    if (this.handlerStart) this.handlerStart(e)
  }

  _handleTick(e) {
    this._state.lastTick = Date.now()
    this.handler(e)
  }

  _handlebody(e) {
    this._debouncedOnEnd(e)
    if (this._state.isChanging) {
      if (this._shouldEmitEvent(this._state.lastTick, this.eventThrottle)) {
        this._handleTick(e)
      }
    } else {
      this._handleStart(e)
    }
  }

  _shouldEmitEvent(lastTick, eventThrottle) {
    const timeSinceLastTick = Date.now() - lastTick
    return eventThrottle > 0 && timeSinceLastTick >= eventThrottle
  }

  _update(e) {
    this._handlebody(e)
    this._state.ticking = false
  }

  _requestTick(e) {
    if (!this._state.ticking) {
      raf(this._update.bind(this, e))
    }
    this._state.ticking = true
  }
}
