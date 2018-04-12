import View from './../View'

const hostStyle = `
  :host {
    position: fixed;
  }
`

const attrs = {
  visible: { default: 0 },
}

const presentationType = {
  crossDissolve: {
  },
  scale: {
  },
  cover: {
  },
}

export default class Presentation extends View {
  constructor() {
    super()
    const style = document.createElement('style')
    style.textContent = hostStyle
    this.shadowRoot.appendChild(style)
  }
  connectedCallback() {
  }
  attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
  }
}
