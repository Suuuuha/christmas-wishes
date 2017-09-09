const postTweet = require('./post_tweet')
const CronJob = require('cron').CronJob;
const arduino = require('../arduino/index.js')

const hashtag = '#NazarethWishes';
const hashtagReg = /#NazarethWishes|\n/g;

let usedIds = [];
let lastScheduledTweetTime = Date.now()

const getTweets = (T) => () => {
  T.get('search/tweets', { q: hashtag }, (err, data, res) => {
    if (err) {
      console.log({ err })
      return
    }
    const tweetIds = data.statuses.map(status => status.id_str);
    tweetIds.forEach((tweetId, index) => {
      if (usedIds.includes(tweetId)) {
        console.log('already got tweet ' + tweetId)
        return
      } else {
        usedIds.push(tweetId)
        const tweetText = data.statuses[index].text.replace(hashtagReg, "")
        const userId = data.statuses[index].user.id
        const tweetTime = Math.max(lastScheduledTweetTime, Date.now())+20000
        const tweetTimeFormat = new Date(tweetTime)
        lastScheduledTweetTime = tweetTime
        userHandle = data.statuses[index].user.screen_name
        console.log({
          found: tweetText,
          userHandle,
          tweetTimeFormat
        })
        postTweet(T)({userHandle, inReplyToStatusId: tweetId, msgTime: tweetTimeFormat}, (err, data) => {
          if (err) return console.log(err)
          console.log('Successfully posted tweet ' + tweetId)
        })
        // Send tweet
        const job = new CronJob(tweetTimeFormat, () => {
          arduino.displayMessage(tweetText)
        }, null, true)
      }
    })
  })
}

module.exports = getTweets
