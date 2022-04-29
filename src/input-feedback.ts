import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('input-feedback')
export class InputFeedback extends LitElement {
  @property({ type: Boolean })
  inputValid = false

  @property({ type: String })
  inputFieldName = ''

  render() {
    return this.inputValid
      ? html` <div>Valid ${this.inputFieldName}</div> `
      : html` <div>Please provide your ${this.inputFieldName}</div> `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'input-feedback': InputFeedback
  }
}
