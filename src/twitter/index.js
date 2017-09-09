const twit = require('twit')
const postTweet = require('./post_tweet')

const T =  new twit({
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_SECRET_KEY,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

module.exports = {
  T,
  sendConfirmation: postTweet(T)
}
