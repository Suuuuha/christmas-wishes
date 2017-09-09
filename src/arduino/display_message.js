const displayMessage = display => message => displayLetters(display)(
  message.split(""),
  () => console.log(`${message} finished printing.`)
)

const displayLetters = display => (letters, cb) => {
  if (!letters.length) {
    display.clear(0)
    display.draw([
     "00000000",
     "01100110",
     "01100110",
     "00000000",
     "00000000",
     "01000010",
     "00111100",
     "00000000"
   ])
    return cb()
  }
  display.draw(0, letters[0])
  setTimeout(() => displayLetters(display)(letters.slice(1), cb), 300)
}

module.exports = displayMessage
