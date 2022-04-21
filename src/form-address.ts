import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('form-address')
export class FormAddress extends LitElement {
  @property()
  streetName: string = 'World'

  render() {
    return html`
      <form id="address-form" className="row g-3" @submit=${this.handleSubmit}>
        <label for="input-street-name"> Street address </label>
        <input
          placeholder="Street name"
          id="input-street-name"
          @input=${this.setStreetName}
        />
        <button type="submit">Submit Address</button>
        <slot></slot>
      </form>
    `
  }

  handleSubmit(event: Event) {
    event.preventDefault()
    console.log(this.streetName)
  }

  setStreetName(event: Event) {
    this.streetName = (event.target as HTMLInputElement).value
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'form-address': FormAddress
  }
}
