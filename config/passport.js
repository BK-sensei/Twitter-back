const passport = require("passport")
const passportLocal = require("passport-local")
const User = require("../models/User")

const LocalStrategy = passportLocal.Strategy

passport.use(new LocalStrategy( async (username, password, done) => {
    console.log(username, password)
    const user = await User.findOne({ username: username, password: password }).lean().exec()
    console.log("passport", user);
    if (!user){
        return done (null, false)
    } 

    return done(null, user)
}))

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser( async (id, done) => {
    console.log(id)
    const user = await User.findById(id).exec()

    done(null, user)
})

module.exports = passport