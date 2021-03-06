import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import './input-street-name.js'
import './input-house-number.js'
import './input-house-number-addition.js'
import './input-city.js'
import './input-additional-information'
import './input-feedback.js'

@customElement('form-address')
export class FormAddress extends LitElement {
  @property({ type: Object })
  inputData = {
    streetName: '',
    houseNumber: '',
    houseNumberAddition: '',
    city: '',
    additionalInformation: '',
  }

  @property({ type: Boolean })
  showInputFeedback = false

  @property({ type: Object })
  inputValidation = {
    streetNameValid: false,
    houseNumber: false,
    city: false,
  }

  render() {
    return html`
      <form
        id="address-form"
        @setStreetName=${this._streetNameListener}
        @setHouseNumber=${this._houseNumberListener}
        @setHouseNumberAddition=${this._houseNumberAdditionListener}
        @setCity=${this._cityListener}
        @setAdditionalInformation=${this._additionalInformationListener}
        @submit=${this._handleSubmit}
      >
        <input-street-name></input-street-name>
        <input-feedback
          ?hidden=${!this.showInputFeedback}
          .inputFieldName=${'street name'}
          .inputValid=${this.inputValidation.streetNameValid}
        ></input-feedback>
        <input-house-number></input-house-number>
        <input-feedback
          ?hidden=${!this.showInputFeedback}
          .inputFieldName=${'house number'}
          .inputValid=${this.inputValidation.houseNumber}
        ></input-feedback>
        <input-house-number-addition></input-house-number-addition>
        <input-city></input-city>
        <input-feedback
          ?hidden=${!this.showInputFeedback}
          .inputFieldName=${'city'}
          .inputValid=${this.inputValidation.city}
        ></input-feedback>
        <input-additional-information></input-additional-information>
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
    this._validationCheck(inputData.houseNumber, 'houseNumber')
    this._validationCheck(inputData.city, 'city')

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
      console.log('housenumber:', inputData.houseNumber)
      console.log('housenumberaddition:', inputData.houseNumberAddition)
      console.log('city:', inputData.city)
      console.log('additionalinformation:', inputData.additionalInformation)
    }
  }

  private _streetNameListener(event: CustomEvent) {
    const streetName = event.detail.streetName
    if (streetName != null) this.inputData.streetName = streetName
    this.showInputFeedback = false
  }

  private _houseNumberListener(event: CustomEvent) {
    const houseNumber = event.detail.houseNumber
    if (houseNumber != null) this.inputData.houseNumber = houseNumber
    this.showInputFeedback = false
  }

  private _houseNumberAdditionListener(event: CustomEvent) {
    const houseNumberAddition = event.detail.houseNumberAddition
    if (houseNumberAddition != null)
      this.inputData.houseNumberAddition = houseNumberAddition
    this.showInputFeedback = false
  }

  private _cityListener(event: CustomEvent) {
    const city = event.detail.city
    if (city != null) this.inputData.city = city
    this.showInputFeedback = false
  }

  private _additionalInformationListener(event: CustomEvent) {
    const additionalInformation = event.detail.additionalInformation
    if (additionalInformation != null)
      this.inputData.additionalInformation = additionalInformation
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
