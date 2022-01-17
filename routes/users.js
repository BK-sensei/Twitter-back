const express = require("express")
const app = express()

const User = require("../models/User")

//créer un nouveau utilisateur
app.post('/', async (req, res) => {

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
      // .populate('garage')
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
      .populate('followers')
      .populate('followings')
      .populate('tweets')
      // .populate('retweets')
      .exec()

    res.json(user)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
})

// Modifier un user, follow/unfollow
app.put('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    ).exec()

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
    await User.deleteOne({ _id: id }).exec()
    res.json({ success: 'User successfully deleted' })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
  }
})

module.exports = app