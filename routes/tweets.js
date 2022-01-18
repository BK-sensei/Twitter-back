const express = require("express")
const app = express()

const Tweet = require("../models/Tweet")
const User = require("../models/User")

const { verifyUser } = require("../middlewares/auth")
const { checkUserId } = require("../middlewares/protection")

// Créer un nouveau tweet
app.post('/', verifyUser, checkUserId, async (req, res) => {
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


// Afficher tous les tweets
app.get('/', async (req, res) => {
  try {
    const tweets = await Tweet.find()
      // .populate('garage')
      .exec()

    res.json(tweets)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
})

// Supprimer un tweet d'un utilisateur
app.delete('/:tweet_id/', verifyUser, checkUserId, async (req, res) => {
  c

  try {
    await Tweet.deleteOne({ _id: tweet_id }).exec()
    await User.updateOne(
      { _id: user }, 
      { $pullAll: { tweets: [tweet_id] } }
    ).exec()
    res.json({ success: 'Tweet successfully deleted' })
    } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
})
    
    
//retweeter
app.put('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const tweet = await Tweet.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    ).exec()

    res.json(tweet)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
})


module.exports = app