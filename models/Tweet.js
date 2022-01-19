const { Schema, model } = require("mongoose")

const TweetSchema = Schema({
  text: {
		type: String,
		maxlength : 280
	},
  pinnedTweet: Boolean,
  likes: Number,
  user: {
    type: Schema.Types.ObjectId, 
    ref:"User" 
  },
  comments: [{ 
    type: Schema.Types.ObjectId, 
    ref: "Comment" 
  }],
  retweets: [{ 
    type: Schema.Types.ObjectId, 
    ref: "User" 
  }]
},{
  timestamps: true
})

const Tweet = model('Tweet', TweetSchema)

module.exports = Tweet