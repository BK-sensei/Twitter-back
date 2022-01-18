const express = require("express")
const app = express()

const Comment = require("../models/Comments")
const User = require("../models/User")

const { verifyUser } = require("../middlewares/auth")
const { checkUserExist } = require("../middlewares/protection")

// Ecrire un commentaire sous un tweet
app.post('/user/:id/tweet', verifyUser, checkUserExist, async (req, res) => {
    const { user } = req.body

    try{
        const comment = await new Comment({...req.body})

        comment.save(async (err, comment) => {
            if (comment) {
                const getUser = await User.findById(user)
                getUser.comments.push(comment._id)
                getUser.save()
    
                res.json(comment)
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

// Supprimer un commentaire
app.delete('/user/:user_id/status/:status_id', verifyUser, checkUserExist, async (req, res) => {
    const { user_id, status_id } = req.params

    try {
        await Comment.deleteOne({_id: status_id}).exec()
        res.json({ success: 'Comment deleted' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err })
    }
})

module.exports = app