import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import './input-street-name.js'
import './input-house-number.js'
import './input-house-number-addition.js'
import './input-postal-code'
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
    postalCode: '',
    city: '',
    additionalInformation: '',
  }

  @property({ type: Boolean })
  showInputFeedback = false

  @property({ type: Object })
  inputValidation = {
    streetNameValid: false,
    houseNumber: false,
    postalCode: false,
    city: false,
  }

  render() {
    return html`
      <form
        id="address-form"
        @setStreetName=${this._streetNameListener}
        @setHouseNumber=${this._houseNumberListener}
        @setHouseNumberAddition=${this._houseNumberAdditionListener}
        @setPostalCode=${this._postalCodeListener}
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
        <input-postal-code
          .postalCode=${this.inputData.postalCode}
        ></input-postal-code>
        <input-feedback
          ?hidden=${!this.showInputFeedback}
          .inputFieldName=${'postal code'}
          .inputValid=${this.inputValidation.postalCode}
        ></input-feedback>
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
    this._postalCodeValidation()

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
      console.log('postalcode:', inputData.postalCode)
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

  private _postalCodeListener(event: CustomEvent) {
    const postalCode = event.detail.postalCode
    if (postalCode != null) this.inputData.postalCode = postalCode
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

  private _postalCodeValidation() {
    const postalCodeRegex = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i
    const postalCode = this.inputData.postalCode

    if (postalCodeRegex.test(postalCode)) {
      if (postalCode.length === 6) {
        const spacedPostalCode =
          postalCode.substring(0, 4) +
          ' ' +
          postalCode.substring(4, postalCode.length)
        const upperCasePostalCode = spacedPostalCode.toUpperCase()
        this.inputData.postalCode = upperCasePostalCode
      }
      this.inputValidation.postalCode = true
      return true
    } else {
      this.inputValidation.postalCode = false
      return false
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'form-address': FormAddress
  }
}
