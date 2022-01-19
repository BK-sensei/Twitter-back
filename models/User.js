const { Schema, model } = require("mongoose")
const Tweet = require("./Tweet")
const Comment = require("./Comment")

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
		type: String,
    unique: true,
		required: true
	},
  email: {
		type: String,
		unique: true,
		required: true
	},
  password: {
		type: String,
		required: true,
    minlength: 8
	},
  birthday: {
    type: Date,
    required: true
  },
  profilePicture: String,
  bio: String,
  location: String,
  website: String,
  followings: [{ type: Schema.Types.ObjectId, ref: "User" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  tweets: [{ type: Schema.Types.ObjectId, ref: "Tweet" }],
  retweets: [{ type: Schema.Types.ObjectId, ref: "Tweet" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
},{
  timestamps: true
})

// Avant de remove un user, on supprime ses tweets et ses comments aussi
UserSchema.pre ("deleteOne", async function(next) {
  const { _id } = this.getFilter()
  
  await Tweet.deleteMany({ user: _id })
  await Comment.deleteMany({ comment: _id })
})

const User = model('User', UserSchema)

module.exports = User