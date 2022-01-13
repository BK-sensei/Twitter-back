const { Schema, model } = require("mongoose")

const UserSchema = Schema({
  name: String,
  username: {
		type: String,
		required: true
	},
  email: {
		type: String,
		// unique: true,
		// required: true
	},
  password: {
		type: String,
		required: true
	},
  profilePicture: String,
  bio: String,
  birthday: Date,
  location: String,
  // followings: { type: Schema.Types.ObjectId, ref: "User" },
  // followers: { type: Schema.Types.ObjectId, ref: "User" },
  // tweets: { type: Schema.Types.ObjectId, ref: "Tweet" },
  // retweets: { type: Schema.Types.ObjectId, ref: "Tweet" },
},{
  timestamps: true
})

const User = model('User', UserSchema)

module.exports = User