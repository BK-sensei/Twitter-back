const express = require("express")
const morgan = require("morgan")
const app = express()
const port = 5000
const { dbConnect } = require("./config/db")

const userRoutes = require("./routes/user")

dbConnect()

app.use(express.json())
app.use(morgan("tiny"))

app.use("./user", userRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})