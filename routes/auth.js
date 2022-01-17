const express = require("express")
const app = express()
const passport = require("../config/passport")
const User = require("../models/User")

// Se connecter à son compte Twitter
app.post('/login', passport.authenticate("local"), async (req, res) => {
    if (req.user) {
        req.logIn(req.user, err => {
            if(err) {
                console.log(err)
            } else {
                res.json(req.user)
            }
        }) 
    }
})

// Se déconnecter de son compte Twitter
app.delete('/logout', async (req, res) => {
    req.logout()
    res.status(200).send("ok")
})

// Se créer un compte un compte Twitter
app.post('/signup', async (req, res) => {
    const { email, username } = req.body

    const user = await User.findOne({ username: username, email: email }).exec()

    if (user) {
        res.status(409).json({ error: 'User already exists' })
    } else {
        try {
            const user = await new User({ ...req.body })
        
            user.save((err, user) => {
              if (user) {
                res.json(user)
                return
              }
        
              console.log(err)
              res.status(500).json({ error: err })
            })
        } catch (error) {
            console.log(err)
            res.status(500).json({ error: err })
        }
    }
})

module.exports = app