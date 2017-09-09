require('env2')('./config.env');
const arduino = require('./arduino')
const twitter = require('./twitter');

const searchInterval = 30000;

arduino.connect(()=>{
  console.log('Christmas Magic is happening on the arduino')
  setInterval(() => {
    twitter.getTweets()
  }, searchInterval)  
});