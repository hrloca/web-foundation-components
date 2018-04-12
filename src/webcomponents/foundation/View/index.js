/**
 * View
 */

import GestureManager from './../../../module/gestureManager'

const hostStyle = `
  :host {
    align-content: flex-start;
    align-items: stretch;
    border-width: 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    margin: 0;
    min-height: 0;
    min-width: 0;
    padding: 0;
    position: relative;
  }
`

const registerGestureWidth = (contextNode) => (gesture) => {
  contextNode.addEventListener('touchstart', e => contextNode.gesture.start(e))
  contextNode.addEventListener('touchmove', e => contextNode.gesture.move(e))
  contextNode.addEventListener('touchend', e => contextNode.gesture.start(e))
}

const attrs = {
  transitionType: { type: String, default: '' },
  transitionDelay: { type: String, default: '' },
  shouldListenGesture: { type: Boolean, default: false },
  useTransitionSystem: { type: Boolean, default: false },
  useSwipeX: { type: Boolean, default: false },
  useSwipeY: { type: Boolean, default: false },
}

const properties = {
  customTransition: { type: Object, default: {} },
}

const EVENT_NAME = {
  // gesture
  ON_GRAB: 'grab',
  ON_GRAB_ONCE: 'grabonce',
  ON_SWIPE_UP: 'swipeup',
  ON_SWIPE_DOWN: 'swipedown',
  ON_SWIPE_LEFT: 'swipeleft',
  ON_SWIPE_RIGHT: 'swiperight',
  ON_SWIPE_UP_RELEASED: 'swiperight',
  ON_SWIPE_DOWN_RELEASED: 'swipedownreleased',
  ON_SWIPE_RIGHT_RELEASED: 'swiperightreleased',
  ON_SWIPE_LEFT_RELEASED: 'swipeleftreleased',
  // transition
  ON_ENTER_WILL_START: 'enterwillstart',
  ON_LEAVE_WILL_START: 'leavewillstart',
  ON_ENTER_DID_END: 'enterdidend',
  ON_LEAVE_DID_END: 'leavedidend',
}

const normaliseAttributeSpanpShotFrom = node => attr => {
  // attrs.name attrs.value
  return Object.keys(attr).reduce((prev, current) => {
    switch (attrs[current].type) {
      case Boolean:
        prev[current] = !!node.attributes[current]
        break
      default:
        prev[current] = node.getAttribute(current)
        break
    }
    return prev
  }, {})
}

export default class View extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    const style = document.createElement('style')
    style.textContent = hostStyle
    this.shadowRoot.appendChild(style)
    this.shadowRoot.appendChild(document.createElement('slot'))
  }

  // lifecycle
  connectedCallback() {
    if (this.hasAttributes()) {
      const attributes = normaliseAttributeSpanpShotFrom(this)(attrs)
      if (attributes.shouldListenGesture) this.registerGesture()
    }

    this.setAttribute('test', '')
    console.log(this.getAttribute('test'))
  }
  disconnectedCallback() {
  }
  attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
  }
  adoptedCallback(oldDocument, newDocument) {
  }

  // original
  registerGesture() {
    this.gesture = new GestureManager({
      useSwipeX: true,
      useSwipeY: false,
      onGrab: e => this.dispatchEvent(new Event(EVENT_NAME.ON_GRAB)),
      onGrabOnce: e => this.dispatchEvent(new Event(EVENT_NAME.ON_GRAB_ONCE)),
      onSwipeUp: e => this.dispatchEvent(new Event(EVENT_NAME.ON_SWIPE_UP)),
      onSwipeDown: e => this.dispatchEvent(new Event(EVENT_NAME.ON_SWIPE_DOWN)),
      onSwipeLeft: e => this.dispatchEvent(new Event(EVENT_NAME.ON_SWIPE_LEFT)),
      onSwipeRight: e => this.dispatchEvent(new Event(EVENT_NAME.ON_SWIPE_RIGHT)),
      onSwipeUpReleased: e => this.dispatchEvent(new Event(EVENT_NAME.ON_SWIPE_UP_RELEASED)),
      onSwipeDownReleased: e => this.dispatchEvent(new Event(EVENT_NAME.ON_SWIPE_DOWN_RELEASED)),
      onSwipeRightReleased: e => this.dispatchEvent(new Event(EVENT_NAME.ON_SWIPE_RIGHT_RELEASED)),
      onSwipeLeftReleased: e => this.dispatchEvent(new Event(EVENT_NAME.ON_SWIPE_LEFT_RELEASED)),
    })
    registerGestureWidth(this)(this.gesture)
  }

}
