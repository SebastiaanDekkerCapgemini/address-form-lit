import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { allowAlphanumeric } from './utilities'

@customElement('input-house-number-addition')
export class InputHouseNumberAddition extends LitElement {
  @property({ type: String })
  houseNumberAddition = ''

  render() {
    return html`
      <label for="input-house-number-addition">Apt, suite</label>
      <input
        placeholder="A"
        id="input-house-number-addition"
        maxlength="5"
        @keypress=${allowAlphanumeric}
        @input=${this._dispatchHouseNumberAddition}
      />
    `
  }

  private _dispatchHouseNumberAddition(event: Event) {
    const houseNumberAddition = (event.target as HTMLInputElement).value
    this.houseNumberAddition = houseNumberAddition

    const options = {
      detail: { houseNumberAddition },
      // enables the event to go up the component tree
      bubbles: true,
      // enables all nodes in DOM tree to see the event
      composed: true,
    }
    this.dispatchEvent(new CustomEvent('setHouseNumberAddition', options))
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'input-house-number-addition': InputHouseNumberAddition
  }
}
