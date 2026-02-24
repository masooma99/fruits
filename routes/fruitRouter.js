const express = require("express")
const router = express.Router()
const fruitController = require("../controllers/fruitController")

router.get("/new", fruitController.showFruitPage)

module.exports = router
