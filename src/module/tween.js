import ee from 'event-emitter'
import BezierEasing from 'bezier-easing'

export default class Tween {
  constructor(obj) {
    this._from = obj
    this.duration(500)
  }

  reset() {
    this.isArray = Array.isArray(this._from)
    this._curr = { ...this._from }
    this._done = false
    this._start = Date.now()
    return this
  }

  to(obj) {
    this.reset()
    this._to = obj
    return this
  }

  duration(ms) {
    this._duration = ms
    return this
  }

  ease(bezierArr) {
    if (!Array.isArray(bezierArr)) return null
    this._ease = BezierEasing(...bezierArr)
    return this
  }

  stop() {
    this.stopped = true
    this._done = true
    this.emit('stop')
    this.emit('end')
    return this
  }

  step() {
    if (this._done) return null

    const duration = this._duration
    const now = Date.now()
    const delta = now - this._start
    const done = delta >= duration

    // complete
    if (done) {
      this._from = this._to
      this._update(this._to)
      this._done = true
      this.emit('end')
      return this
    }

    // tween
    const from = this._from
    const to = this._to
    const curr = this._curr
    const p = (now - this._start) / duration
    const n = this._ease(p)

    if (this.isArray) {
      for (let i = 0; i < from.length; ++i) {
        curr[i] = from[i] + (to[i] - from[i]) * n
      }
      this._update(curr)
      return this
    }

    /* eslint-disable */
    for (const k in from) {
      curr[k] = from[k] + (to[k] - from[k]) * n
    }

    this._update(curr)
    return this
  }

  regist(fn) {
    this._update = fn
    return this
  }

  update() {
    return this.step()
  }
}

ee(Tween.prototype)
