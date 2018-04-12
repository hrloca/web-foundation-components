import View from './../View'

const hostStyle = `
  :host {
  }
`

export default class Image extends View {
  constructor() {
    super()
    const style = document.createElement('style')
    style.textContent = hostStyle
    this.shadowRoot.appendChild(style)
  }
  connectedCallback() {
    super.connectedCallback()
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
