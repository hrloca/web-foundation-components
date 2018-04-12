export default class Observer {
  constructor() {
    this.handlers = []
  }
  register(cb) {
    if (cb && typeof cb === 'function') this.handlers.push(cb)
  }
  releaseAll() {
    this.handlers = []
  }
  release(cb) {
    if (cb && typeof cb === 'function') {
      const index = this.handlers.findIndex(val => val === cb)
      if (index !== -1) this.handlers.splice(index, 1)
    }
  }
  dispatch(...args) {
    for (let i = 0; i < this.handlers.length; ++i) {
      this.handlers[i](...args)
    }
  }
}
