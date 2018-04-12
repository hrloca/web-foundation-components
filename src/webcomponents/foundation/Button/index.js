/**
 * Button
 */

import View from './../View'
import { hostStyle } from './style'
import { EVENT_NAME } from './constants'

export default class Button extends View {
  constructor() {
    super()
    const style = document.createElement('style')
    style.textContent = hostStyle
    this.shadowRoot.appendChild(style)
  }

  // lifecycle
  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('click', e => this.dispatchEvent(new Event(EVENT_NAME.ON_PRESS, e)))
  }
  disconnectedCallback() {
    super.disconnectedCallback()
  }
  attributeChangedCallback(...args) {
    super.attributeChangedCallback(...args)
  }
  adoptedCallback(...args) {
    super.adoptedCallback(...args)
  }
}
