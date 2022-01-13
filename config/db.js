const mongoose = require("mongoose")

const dbConnect = () => {
  const dbName = 'SuperTwitter'
  const dbUrl = 'mongodb+srv://recjong:recjong@clustertwitter.is0on.mongodb.net/SuperTwitter'

  try {
    mongoose.connect(dbUrl)
    console.log(`Connected to ${dbName} database`)
  } catch (err) {
    console.log(err)
  }
}

module.exports = { 
  dbConnect
}