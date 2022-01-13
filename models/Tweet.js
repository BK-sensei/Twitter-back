const { Schema, model } = require("mongoose")

const TweetSchema = Schema({
  user: {
		type: String,
		// required: true
	},
  pinnedTweet: Boolean,
  likes: Number,
  //retweets: [{ type: Schema.Types.ObjectId, ref: "User" }],
  //comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
},{
  timestamps: true
})