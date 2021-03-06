const hostStyle = `
  :host {
  }
`

export default class ScrollView extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    const style = document.createElement('style')
    style.textContent = hostStyle
    this.shadowRoot.appendChild(style)
    this.shadowRoot.appendChild(document.createElement('slot'))
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
