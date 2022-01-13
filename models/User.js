const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
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