/**
 * Button
 */

import View from './../View'

const hostStyle = `
  :host {
    display: inline-flex
  }
`

export default class Button extends View {
  constructor() {
    super()
    const style = document.createElement('style')
    style.textContent = hostStyle
    this.shadowRoot.appendChild(style)
    this.addEventListener('click', e => this.dispatchEvent(new Event('press', e)))
  }

  // lifecycle
  connectedCallback() {
    super.connectedCallback()
    console.log('Button', 'connectedCallback')
  }
}
