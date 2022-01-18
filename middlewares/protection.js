const User = require("../models/User")

const checkUserExist = async (req, res, next) => {
    const { email, username } = req.body

    const user = await User.findOne({ username: username, email: email }).exec()

    if (user) {
        res.status(409).json({ error: 'User already exists' })
    } else {
        next()
    }
}  

module.exports = {
    checkUserExist
}