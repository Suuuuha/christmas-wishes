const express = require('express');
const twit = require('twit');
require('env2')('./config.env');

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
        wishesQueue.push({
              id: tweetId,
              text: data.statuses[index].text.replace(hashtagReg, " "),
              userId: data.statuse[index].user.id
            })
             usedIds.push(tweetId)
          }
      })
  })
}, searchInterval)
//
// T.post('statuses/update', { status: 'SUHA WASSUP' }, (err, data, response) => {
//   console.log(data);
// })
module.exports = app;
