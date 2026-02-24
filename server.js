require("dotenv").config({ quiet: true })
const express = require("express")
const db = require("./db")
const fruitRouter = require("./routes/fruitRouter")
const app = express()

const PORT = 3000

app.use("/fruits", fruitRouter)

app.get("/", async (req, res) => {
  res.render("home.ejs")
})

app.listen(PORT, () => {
  console.log(`Express server is listening on port : ${PORT}`)
})
