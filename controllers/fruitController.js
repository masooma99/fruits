const Fruit = require("../models/Fruit")

const showFruitPage = async (req, res) => {
  try {
    res.send("This is the new fruit page!")
  } catch (error) {
    res.send("error")
  }
}

module.exports = {
  showFruitPage,
}
