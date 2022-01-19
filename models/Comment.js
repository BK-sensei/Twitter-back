const { Schema, model } = require("mongoose")

const CommentSchema = Schema({
    text: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        // required: true,
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: "User"
    },
    tweet: {
        type: Schema.Types.ObjectId, 
        ref: "Tweet"
    },
}, {
    timestamps: true
})

const Comment = model('Comments', CommentSchema)

module.exports = Comment