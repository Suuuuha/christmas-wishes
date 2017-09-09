const displayMessage = display => message => displayLetters(display)(
  message.split(""),
  () => console.log(`${message} finished printing.`)
)

const displayLetters = display => (letters, cb) => {
  if (!letters.length) {
    display.clear(0)
    return cb()
  }
  display.draw(0, letters[0])
  setTimeout(() => displayLetters(display)(letters.slice(1), cb), 300)
}

module.exports = displayMessage
