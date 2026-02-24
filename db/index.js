const mongoose = require("mongoose")
//now we can use mongoose.connect() method to connect to out db

const connect = () => {
  try {
    mongoose.connect(process.env.MONGODB_URI)

    mongoose.connection.on("connected", () => {
      console.log("Successfully connected to fruits db . . .")
    })
  } catch (error) {
    console.log("Error connecting to MongoDB . . .")
    console.log(error)
  }
}

connect()

module.exports = mongoose
