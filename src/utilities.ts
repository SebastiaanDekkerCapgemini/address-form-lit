export function allowAlphanumeric(event: KeyboardEvent) {
  const allowedCharacters = new RegExp('^[a-zA-Z0-9 ]+$')
  // test if current typed character complies to allowed characters
  if (!allowedCharacters.test(event.key)) {
    event.preventDefault()
    return false
  }
  return true
}

export function allowMaxCharacters(event: Event, maxCharacters: number) {
  ;(event.target as HTMLInputElement).value = (
    event.target as HTMLInputElement
  ).value.slice(0, maxCharacters)
}
