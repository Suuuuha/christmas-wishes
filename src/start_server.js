const app = require('./server.js');
const arduino = require('./arduino')

const PORT = process.env.PORT || 4040;

arduino.connect(() => {
  app.listen(PORT, () => {
    console.log(`Christmas Magic is happening on port ${PORT}!`);
    arduino.displayMessage('Ready or not.')
  });
})

