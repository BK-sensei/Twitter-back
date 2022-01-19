const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
const port = 5000

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))

const { dbConnect } = require("./config/db")
const passport = require("./config/passport")
const session = require("express-session")

const userRoutes = require("./routes/users")
const tweetRoutes = require("./routes/tweets")
const commentRoutes = require("./routes/comments")
const authRoutes = require("./routes/authentication")

dbConnect()

app.use(express.json())
app.use(morgan("tiny"))

app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use("/users", userRoutes)
app.use("/tweets", tweetRoutes)
app.use('/comments', commentRoutes)
app.use('/auth', authRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})