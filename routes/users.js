const express = require("express")
const app = express()

const User = require("../models/User")

//créer un nouveau utilisateur
app.post('/', async (req, res) => {
  const { newUser } = req.body

  try {
    const user = await new User({ ...req.body })
    
    user.save(async (err, user) => {
      if (user) {
      //   const getGarage = await Garage.findById(garage)
      //   getGarage.users.push(newUser._id)
      //   getGarage.save()

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

// Afficher toutes les voitures
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

module.exports = app