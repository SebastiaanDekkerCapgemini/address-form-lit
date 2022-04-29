import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { allowAlphanumeric } from './utilities'

@customElement('input-city')
export class InputCity extends LitElement {
  @property({ type: String })
  city = ''

  render() {
    return html`
      <label for="input-city">City</label>
      <input
        placeholder="City name"
        id="input-city"
        maxlength="30"
        @keypress=${allowAlphanumeric}
        @input=${this._dispatchCity}
      />
    `
  }

  private _dispatchCity(event: Event) {
    const city = (event.target as HTMLInputElement).value
    this.city = city

    const options = {
      detail: { city },
      // enables the event to go up the component tree
      bubbles: true,
      // enables all nodes in DOM tree to see the event
      composed: true,
    }
    this.dispatchEvent(new CustomEvent('setCity', options))
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'input-city': InputCity
  }
}
