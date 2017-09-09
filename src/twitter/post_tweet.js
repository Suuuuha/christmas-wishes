const dateFormat = require('dateformat')
const sanitise = tweet => tweet.slice(0, 140);

const postTweet = T => ({ userHandle, inReplyToStatusId, msgTime }, cb) => {
  console.log('replying to tweet:', inReplyToStatusId)
  const tweet = sanitise(`Merry Christmas @${userHandle}, be ready for your message at ${dateFormat(msgTime, 'HH:MM:ss')}!`)
  const opts = {
    status: tweet,
    in_reply_to_status_id: inReplyToStatusId
  }
  T.post('statuses/update', opts, (err, data, response) => {
    cb(err, data)
  })
}

module.exports = postTweet;
