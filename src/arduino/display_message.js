var five = require("johnny-five")

var board = new five.Board({
  repl: false
})

board.on("ready", function() {
  console.log('board ready')
  var display = new five.Led.Matrix({
    pins: {
      data: 2,
      clock: 3,
      cs: 4
    }
  })
  display.on()
})

function displayMessage(display, message) {
  displayLetters(display, message.split(""))
}

function displayLetters(display, letters) {
  if (!letters.length) {
    display.clear(0)
    return console.log('done.')
  }
  display.draw(0, letters[0])
  setTimeout(() => displayLetters(display, letters.slice(1)), 300)
}

module.exports = displayMessage
