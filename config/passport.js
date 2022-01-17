const passport = require("passport")
const passportLocal = require("passport-local")
const User = require("../models/User")

const LocalStrategy = passportLocal.Strategy

passport.use(new LocalStrategy( async (username, password, done) => {
    const user = await User.findOne({ username: username, password: password }).exec()
    
    if (!user){
        return done (null, false)
    } 

    return done(null, user)
}))

passport.serializeUser((_id, done) => {
    done(null, User._id)
})

passport.deserializeUser((id, done) => {
    const user = await User.findById(id).exec()

    done(null, user)
})

module.exports = passport