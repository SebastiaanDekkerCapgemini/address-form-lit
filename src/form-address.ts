import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import './input-street-name.js'
import './input-feedback.js'

@customElement('form-address')
export class FormAddress extends LitElement {
  @property({ type: String })
  streetName = ''

  @property({ type: Boolean })
  showInputFeedback = false

  @property({ type: Boolean })
  streetNameValid = false

  render() {
    return html`
      <form
        id="address-form"
        @setStreetName=${this._streetNameListener}
        @submit=${this.handleSubmit}
      >
        <input-street-name></input-street-name>
        <input-feedback
          ?hidden=${!this.showInputFeedback}
          .inputFieldName=${'street name'}
          .inputValid=${this.streetNameValid}
        ></input-feedback>
        <button type="submit">Submit Address</button>
      </form>
    `
  }

  handleSubmit(event: Event) {
    event.preventDefault()
    if (this.streetName.length != null) {
      console.log(this.streetName)
    }
    this.showInputFeedback = true
    this._validationCheck(this.streetName)
  }

  private _streetNameListener(event: CustomEvent) {
    const streetName = event.detail.streetName
    if (streetName != null) this.streetName = streetName
    this.showInputFeedback = false
  }

  private _validationCheck(inputValue: String) {
    inputValue === ''
      ? (this.streetNameValid = false)
      : (this.streetNameValid = true)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'form-address': FormAddress
  }
}
