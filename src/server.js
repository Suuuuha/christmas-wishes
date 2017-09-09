const express = require('express');
require('env2')('./config.env');

const searchInterval = 10000;

const app = express();

const twitter = require('./twitter');

let loop = setInterval(() => {
  twitter.getTweets()
}, searchInterval)

module.exports = app;
