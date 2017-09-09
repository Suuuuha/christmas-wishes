const displaySmiley = display => () => {
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
	setTimeout(() => {
    display.clear(0)
    console.log('finished smiley')
  }, 2000)
}

module.exports = displaySmiley