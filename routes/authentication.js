const express = require("express")
const app = express()
const passport = require("../config/passport")
const User = require("../models/User")

// Se connecter à son compte Twitter
app.post('/login', passport.authenticate("local"), async (req, res) => {
    console.log("route authentication", req.user);
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

module.exports = app