const sanitise = tweet => tweet.slice(0, 140);

const postTweet = T => ({ userHandle, inReplyToStatusId, msgTime }, cb) => {
  console.log('replying to tweet:', inReplyToStatusId)
  const tweet = sanitise(`Merry Christmas @${userHandle}! Be ready for your message at ${msgTime}`)
  const opts = {
    status: tweet,
    in_reply_to_status_id: inReplyToStatusId
  }
  T.post('statuses/update', opts, (err, data, response) => {
    cb(err, data)
  })
}

module.exports = postTweet;
