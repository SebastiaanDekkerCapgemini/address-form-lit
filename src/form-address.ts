import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('form-address')
export class FormAddress extends LitElement {
  @property()
  streetName: string = ''

  render() {
    return html`
      <form
        id="address-form"
        className="row g-3"
        @setStreetName=${this._streetNameListener}
        @submit=${this.handleSubmit}
      >
        <slot></slot>
        <button type="submit">Submit Address</button>
      </form>
    `
  }

  handleSubmit(event: Event) {
    event.preventDefault()
    if (this.streetName.length != 0) {
      console.log(this.streetName)
    }
  }

  _streetNameListener(event: CustomEvent) {
    const streetName = event.detail.streetName
    if (streetName != null) this.streetName = streetName
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'form-address': FormAddress
  }
}
