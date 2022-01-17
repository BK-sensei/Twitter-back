const express = require("express")
const app = express()

const Tweet = require("../models/Tweet")
const User = require("../models/User")

//créer un nouveau tweet
app.post('/', async (req, res) => {
  const { user } = req.body

  try {
    const tweet = await new Tweet({ ...req.body })
    
    tweet.save(async (err, tweet) => {
      if (tweet) {
        const getUser = await User.findById(user)
        getUser.tweets.push(tweet._id)
        getUser.save()

        res.json(tweet)
        return
      }

      console.log(err)
      res.status(500).json({ error: err })
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
})

module.exports = app