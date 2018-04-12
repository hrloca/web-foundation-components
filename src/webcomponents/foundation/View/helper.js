import GestureManager from './../../../module/gestureManager'
import { EVENT_NAME } from './constants'

export const isExistAttr = node => attName => node.getAttribute(attName) !== null

export const registerGestureWidth = node => gesture => {
  node.addEventListener('touchstart', e => gesture.start(e))
  node.addEventListener('touchmove', e => gesture.move(e))
  node.addEventListener('touchend', e => gesture.end(e))
}

export const applyGestureTo = node => (opt = {}) => new GestureManager({
  useSwipeX: opt.useSwipeX || true,
  useSwipeY: opt.useSwipeX || false,
  onGrab: e => node.dispatchEvent(new Event(EVENT_NAME.ON_GRAB)),
  onGrabOnce: e => node.dispatchEvent(new Event(EVENT_NAME.ON_GRAB_ONCE)),
  onSwipeUp: e => node.dispatchEvent(new Event(EVENT_NAME.ON_SWIPE_UP)),
  onSwipeDown: e => node.dispatchEvent(new Event(EVENT_NAME.ON_SWIPE_DOWN)),
  onSwipeLeft: e => node.dispatchEvent(new Event(EVENT_NAME.ON_SWIPE_LEFT)),
  onSwipeRight: e => node.dispatchEvent(new Event(EVENT_NAME.ON_SWIPE_RIGHT)),
  onSwipeUpReleased: e => node.dispatchEvent(new Event(EVENT_NAME.ON_SWIPE_UP_RELEASED)),
  onSwipeDownReleased: e => node.dispatchEvent(new Event(EVENT_NAME.ON_SWIPE_DOWN_RELEASED)),
  onSwipeRightReleased: e => node.dispatchEvent(new Event(EVENT_NAME.ON_SWIPE_RIGHT_RELEASED)),
  onSwipeLeftReleased: e => node.dispatchEvent(new Event(EVENT_NAME.ON_SWIPE_LEFT_RELEASED)),
})
