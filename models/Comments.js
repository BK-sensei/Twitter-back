const { Schema, model } = require("mongoose")

const CommentsSchema = Schema({
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

const Comments = model('Comments', CommentsSchema)

module.exports = Comments