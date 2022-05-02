import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { allowAlphanumeric } from './utilities'

@customElement('input-postal-code')
export class InputPostalCode extends LitElement {
  @property({ type: String })
  postalCode = ''

  render() {
    return html`
      <label for="input-postal-code">Postal code</label>
      <input
        placeholder="1000 AB"
        id="input-postal-code"
        maxlength="7"
        @keypress=${allowAlphanumeric}
        @input=${this._dispatchPostalCode}
      />
    `
  }

  private _dispatchPostalCode(event: Event) {
    const postalCode = (event.target as HTMLInputElement).value
    this.postalCode = postalCode

    const options = {
      detail: { postalCode },
      // enables the event to go up the component tree
      bubbles: true,
      // enables all nodes in DOM tree to see the event
      composed: true,
    }
    this.dispatchEvent(new CustomEvent('setPostalCode', options))
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'input-postal-code': InputPostalCode
  }
}
