export function allowAlphanumeric(event: KeyboardEvent) {
  const allowedCharacters = new RegExp('^[a-zA-Z0-9 ]+$')
  // test if current typed character complies to allowed characters
  if (!allowedCharacters.test(event.key)) {
    event.preventDefault()
    return false
  }
  return true
}
