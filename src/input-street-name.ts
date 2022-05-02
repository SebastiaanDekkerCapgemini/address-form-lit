import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { allowAlphanumeric } from './utilities'

@customElement('input-street-name')
export class InputStreetName extends LitElement {
  @property({ type: String })
  streetName = ''

  render() {
    return html`
      <label for="input-street-name">Street address</label>
      <input
        placeholder="Street name"
        id="input-street-name"
        maxlength="30"
        @keypress=${allowAlphanumeric}
        @input=${this._dispatchStreetName}
      />
    `
  }

  private _dispatchStreetName(event: Event) {
    const streetName = (event.target as HTMLInputElement).value
    this.streetName = streetName

    const options = {
      detail: { streetName },
      // enables the event to go up the component tree
      bubbles: true,
      // enables all nodes in DOM tree to see the event
      composed: true,
    }
    this.dispatchEvent(new CustomEvent('setStreetName', options))
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'input-street-name': InputStreetName
  }
}
