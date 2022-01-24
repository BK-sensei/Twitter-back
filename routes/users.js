const express = require("express")
const app = express()

const User = require("../models/User")

const { verifyUser } = require("../middlewares/auth")
const { UserExist } = require("../middlewares/protection")
const Tweet = require("../models/Tweet")

// Se créer un compte un compte Twitter
app.post('/', UserExist, async (req, res) => {

  try {
    const user = await new User({ ...req.body })
    
    user.save(async (err, user) => {
      if (user) {
        res.json(user)
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

// Afficher tous les users
app.get('/', async (req, res) => {
  try {
    const users = await User.find()
    .populate({
      path: 'tweets',
      populate: {
          path: 'user',
          select: 'username',
      },
      populate : {
          path : 'comments',
          select : 'user text',
      }   
    })
    .exec()

    res.json(users)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
})

// Afficher un user selon son id
app.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findById(id)
      .populate({
        path: 'followers',
        select: 'username followers followings tweets retweets'
      })
      .populate({
        path: 'followings',
        select: 'username followers followings tweets retweets'
      })
      .populate({
        path: 'tweets'
      })
      .populate({
        path: 'retweets'
      })
      .exec()

    res.json(user)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
})


// Modifier un user : MAJ bio, pp, bday, location, follow/unfollow, website
app.put('/:id', verifyUser, UserExist, async (req, res) => {
  const { id } = req.params
  // console.log("req.body ", req.body)
  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    ).exec()
    // console.log("user", user)
    res.json(user)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
})

// Effacer un user
app.delete('/:id', async (req, res) => {
  const { id } = req.params

  try {
    await User.deleteOne({ _id: id })

    res.json({ success: 'User successfully deleted' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
})

module.exports = app