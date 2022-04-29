import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { allowMaxCharacters } from './utilities'

@customElement('input-house-number')
export class InputHouseNumber extends LitElement {
  @property({ type: String })
  houseNumber = ''

  render() {
    return html`
      <label for="input-house-number">House number</label>
      <input
        type="number"
        min="1"
        max="99999"
        placeholder="1"
        id="input-house-number"
        @input=${this._oninput}
      />
    `
  }

  private _oninput(event: Event) {
    allowMaxCharacters(event, 5)
    // console.log(event.target)
    this._dispatchHouseNumber(event)
  }

  private _dispatchHouseNumber(event: Event) {
    const houseNumber = (event.target as HTMLInputElement).value
    this.houseNumber = houseNumber

    const options = {
      detail: { houseNumber },
      // enables the event to go up the component tree
      bubbles: true,
      // enables all nodes in DOM tree to see the event
      composed: true,
    }
    this.dispatchEvent(new CustomEvent('setHouseNumber', options))
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'input-house-number': InputHouseNumber
  }
}
