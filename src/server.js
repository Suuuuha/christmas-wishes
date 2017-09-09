const express = require('express');
require('env2')('./config.env');

const app = express();

const twitter = require('./twitter').T;

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
}, searchInterval)

module.exports = app;
