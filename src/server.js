const express = require('express');
const twit = require('twit');
require('env2')('./config.env');
const CronJob = require('cron').CronJob;
const arduino = require('./arduino/index.js')

const app = express();


const T =  new twit({
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_SECRET_KEY,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

const hashtag = '#SuhaPleaseFindThis';
const hashtagReg = /#SuhaPleaseFindThis|\n/g;
const searchInterval = 10000;

let wishesQueue = [];
let usedIds = [];
let lastScheduledTweetTime = Date.now()

let loop = setInterval(() => {
  T.get('search/tweets', { q: hashtag }, (err, data, res) => {
    if (err) {
      console.log({ err })
      return
    }
    const tweetIds = data.statuses.map(status => status.id);
    tweetIds.forEach((tweetId, index) => {
      if (usedIds.includes(tweetId)) {
        return
      } else {
        const tweetText = data.statuses[index].text.replace(hashtagReg, " ")
        const userId = data.statuses[index].user.id
        wishesQueue.push({
              id: tweetId,
              text: tweetText,
              userId
            })
        usedIds.push(tweetId)
        const tweetTime = Math.max(lastScheduledTweetTime, Date.now())+20000
        const tweetTimeFormat = new Date(tweetTime)
        lastScheduledTweetTime = tweetTime
        // Send tweet
        const job = new CronJob(tweetTimeFormat, () => {
          arduino.displayMessage(tweetText)
        }, null, true)
      }
    })
  })
}, searchInterval)
//
// T.post('statuses/update', { status: 'SUHA WASSUP' }, (err, data, response) => {
//   console.log(data);
// })
module.exports = app;
