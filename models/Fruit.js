const { name } = require("ejs")
const mongoose = require("mongoose")

const fruitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    isReadyToEat: {
      type: Boolean,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Fruit", fruitSchema)
