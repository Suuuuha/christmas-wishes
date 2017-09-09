const five = require("johnny-five")
const displayMessage = require('./display_message')

let display

const arduino = {}

arduino.connect = cb => {
  const board = new five.Board({
    repl: false
  })
  board.on("ready", () => {
    console.log('Board ready')
    display = new five.Led.Matrix({
      pins: {
        data: 2,
        clock: 3,
        cs: 4
      }
    })
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
    arduino.displayMessage = displayMessage(display)
    display.on()
    cb()
  })
}

arduino.displayMessage = () => console.error('No display')

module.exports = arduino
