const express = require("express")
const app = express()

const Comment = require("../models/Comments")
const User = require("../models/User")
const Tweet = require("../models/Tweet")

const { verifyUser } = require("../middlewares/auth")
const { checkUserId } = require("../middlewares/protection")

// Ecrire un commentaire sous un tweet
app.post('/', verifyUser, checkUserId, async (req, res) => {
    const { user, tweet } = req.body

    try{
        const comment = await new Comment({...req.body})

        comment.save(async (err, comment) => {
            if (comment) {
                await User.updateOne(
                    { _id: user },
                    { $push: { comments: comment._id } }
                )
                
                await Tweet.updateOne(
                    { _id: tweet },
                    { $push: { tweets: tweet._id}}
                )
    
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
app.delete('/:comment_id', verifyUser, checkUserId,  async (req, res) => {
    const { comment_id } = req.params
    const { user, tweet } = req.body

    try {
        await Comment.deleteOne({ _id: comment_id }).exec()

        await Tweet.updateOne(
            { _id: tweet }, 
            { $pullAll: { comments: [comment_id] } }
        ).exec()

        await User.updateOne(
            { _id: user }, 
            { $pullAll: { comments: [comment_id] } }
        ).exec()

        res.json({ success: 'Comment deleted' })

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err })
    }
})

module.exports = app