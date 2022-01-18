const User = require("../models/User")

const UserExist = async (req, res, next) => {
    const { email, username } = req.body

    const user = await User.findOne({ username: username, email: email }).exec()

    if (user) {
        res.status(409).json({ error: 'User already exists' })
    } else {
        next()
    }
}

const checkUserId = (req, res, next) => {
    console.log((req.body.user))
    console.log("yoyoy", req.user)
    if( req.body.user === req.user._id.valueOf() ){
        next()
    } else {
        res.status(401).json({ error : "Unauthorized"})
    }
}

module.exports = {
    UserExist,
    checkUserId
}