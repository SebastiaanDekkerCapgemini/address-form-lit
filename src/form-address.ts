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
        @submit=${this._handleSubmit}
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

  private _handleSubmit(event: Event) {
    event.preventDefault()
    const inputData = this.inputData
    const inputValidation = this.inputValidation
    let allFieldsValid: Boolean = false

    this.showInputFeedback = true
    this._validationCheck(inputData.streetName, 'streetNameValid')

    for (let key in inputValidation) {
      // console.log(inputValidation.hasOwnProperty(key))
      console.log(inputValidation[key as keyof typeof inputValidation])
      if (inputValidation[key as keyof typeof inputValidation]) {
        allFieldsValid = true
      } else {
        allFieldsValid = false
      }
    }

    if (allFieldsValid) {
      console.log('streetname:', inputData.streetName)
    }
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
