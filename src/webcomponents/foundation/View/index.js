/**
 * View
 */
import { hostStyle } from './style'
import { isExistAttr, registerGestureWidth, applyGestureTo } from './helper'
import { EVENT_NAME } from './constants'

const attrs = {
  useTransitionSystem: { type: Boolean, default: false },
  transitionType: { type: String, default: '' },
  transitionDelay: { type: String, default: '' },
  transitionState: { type: Boolean, default: false },
  shouldListenGesture: { type: Boolean, default: false },
  useSwipeX: { type: Boolean, default: false },
  useSwipeY: { type: Boolean, default: false },
}

const properties = {
  customTransition: { type: Object, default: {} },
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
  // ----------------------------------------
  connectedCallback() {
    if (this.hasAttr('shouldListenGesture')) this.registerGestureEvent()
    if (this.hasAttr('useTransitionSystem')) this.registerTransition()
  }
  disconnectedCallback() {
  }
  attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
  }
  adoptedCallback(oldDocument, newDocument) {
  }

  // original
  // ----------------------------------------
  hasAttr(attrName) {
    return isExistAttr(this)(attrName)
  }

  registerGestureEvent() {
    registerGestureWidth(this)(applyGestureTo(this)())
  }

  registerTransition() {
    this.addEventListener('transitionend', () => {
    })
  }
  handleTransitionStart() {
  }
  handleTransitionEnd(e) {
    e.stopPropagation()
  }
  enterWillStart() {
    this.dispatchEvent(new Event(EVENT_NAME.ON_ENTER_WILL_START))
  }
  leaveWillStart() {
    this.dispatchEvent(new Event(EVENT_NAME.ON_LEAVE_WILL_START))
  }
  enterDidEnd() {
    this.dispatchEvent(new Event(EVENT_NAME.ON_ENTER_DID_END))
  }
  leaveDidEnd() {
    this.dispatchEvent(new Event(EVENT_NAME.ON_LEAVE_DID_END))
  }
}
