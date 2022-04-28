import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import './input-street-name.js'
import './input-feedback.js'

@customElement('form-address')
export class FormAddress extends LitElement {
  @property({ type: Object })
  inputData = { streetName: '' }

  @property({ type: Boolean })
  showInputFeedback = false

  @property({ type: Object })
  inputValidation = {
    streetNameValid: false,
  }

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
          .inputValid=${this.inputValidation.streetNameValid}
        ></input-feedback>
        <button type="submit">Submit Address</button>
      </form>
    `
  }

  handleSubmit(event: Event) {
    event.preventDefault()
    if (this.inputData.streetName.length != null) {
    }
    this.showInputFeedback = true
    this._validationCheck(this.inputData.streetName, 'streetNameValid')
  }

  private _streetNameListener(event: CustomEvent) {
    const streetName = event.detail.streetName
    if (streetName != null) this.inputData.streetName = streetName
    this.showInputFeedback = false
  }

  private _validationCheck(
    inputValue: String,
    inputValidationPropertyName: String
  ) {
    if (inputValue === '') {
      this.inputValidation[
        inputValidationPropertyName as keyof typeof this.inputValidation
      ] = false
    } else {
      this.inputValidation[
        inputValidationPropertyName as keyof typeof this.inputValidation
      ] = true
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'form-address': FormAddress
  }
}
