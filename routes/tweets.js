const express = require("express")
const app = express()

const Tweet = require("../models/Tweet")
const User = require("../models/User")
// const Comment = require("../models/Comment")

const { verifyUser } = require("../middlewares/auth")
const { checkUserId } = require("../middlewares/protection")
const { application } = require("express")

// Créer un nouveau tweet
app.post('/', verifyUser, checkUserId, async (req, res) => {
  const { user } = req.body

  try {
    const tweet = await new Tweet({ ...req.body })
    
    tweet.save(async (err, tweet) => {
      if (tweet) {
        await User.updateOne(
          { _id: user },
          { $push: { tweets: tweet._id}}
        )

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
    .populate({
      path: 'user',
      select: 'name username'
    })
    // .populate({
    //   path : 'comments',
    //   select: 'user text createdAt updatedAt'
    // })
    .exec()

    res.json(tweets)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
})

// Supprimer un tweet d'un utilisateur
app.delete('/:tweet_id', verifyUser, checkUserId, async (req, res) => {
  const { tweet_id } = req.params
  const { user } = req.body

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
    
// Retweeter - remplir le tableau de retweet d'un tweet
app.put('/:id', async (req, res) => {
  const { id } = req.params
  const { user } = req.body

  try {
    const tweet = await Tweet.findOneAndUpdate(
      { _id: id },
      { $push: { retweets: user } },
      { new: true }
    ).exec()
    
    await User.findOneAndUpdate(
      { _id: user },
      { $push: { retweets: id } }
    ).exec()

    res.json(tweet)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
})

//Afficher les tweets des followers et user
app.get("/feed", async (req, res) => {
   
  if (req.user) {
      let followings_id = req.user.followings.map(element => element._id.valueOf())
      followings_id = [...followings_id, req.user._id]
      
      const feed = await Tweet.find({ user: {$in : followings_id }})
        .populate('user')
      res.json(feed)
  } else {
      const feed = await Tweet.find()
        .populate('user')
      res.json(feed)
  }
})

// // Afficher les commentaires d'un tweet
// app.get('/comments/:tweet_id', async (req, res) => {
//   const { tweet_id } = req.params

//   const tweetComments = await Comment.find(
//     { tweet: tweet_id }
//   )
//   // .populate('comments')
//   .exec()

//   res.json(tweetComments)
// })


module.exports = app