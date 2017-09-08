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

let wishesQueue = [];
let usedIds = [];

let loop = setInterval(() => {
  T.get('search/tweets', { q: '#SuhaPleaseFindThis' }, (err, data, res) => {
    if (err) {
      console.log({ err })
      return
    }
    const tweetIds = data.statuses.map(status => status.id);
    tweetIds.forEach((tweetId, index) => {
      console.log(tweetId)
      console.log(data.statuses[index].text)
      if (usedIds.includes(tweetId)) {
        return
      } else {
        wishesQueue.push({
              id: tweetId,
              text: data.statuses[index].text.replace(/#SuhaPleaseFindThis|\n/g, " ")
            })
             usedIds.push(tweetId)
          }
      })
    console.log({ wishesQueue });
    console.log({ tweetIds });
  })
}, 1000)
//
// T.post('statuses/update', { status: 'SUHA WASSUP' }, (err, data, response) => {
//   console.log(data);
// })
module.exports = app;
