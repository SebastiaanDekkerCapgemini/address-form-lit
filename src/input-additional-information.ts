import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { allowAlphanumeric } from './utilities'

@customElement('input-additional-information')
export class InputAdditionalInformation extends LitElement {
  @property({ type: String })
  additionalInformation = ''

  render() {
    return html`
      <label for="input-additional-information">Additional information</label>
      <textarea
        id="input-additional-information"
        rows="2"
        maxlength="50"
        @keypress=${allowAlphanumeric}
        @input=${this._dispatchAdditionalInformation}
      ></textarea>
    `
  }

  private _dispatchAdditionalInformation(event: Event) {
    const additionalInformation = (event.target as HTMLInputElement).value
    this.additionalInformation = additionalInformation

    const options = {
      detail: { additionalInformation },
      // enables the event to go up the component tree
      bubbles: true,
      // enables all nodes in DOM tree to see the event
      composed: true,
    }
    this.dispatchEvent(new CustomEvent('setAdditionalInformation', options))
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'input-additional-information': InputAdditionalInformation
  }
}
