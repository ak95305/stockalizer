const express = require('express');
const stocksController = require("../controllers/stocks-controller");
const authToken = require('../middlewares/auth');

const router = express.Router();

router.get("/:sid", stocksController.getStockById)

// router.get("/user/:uid", stocksController.getPlaceByUserId)

router.get("/", stocksController.getAllStocks)

router.post("/", stocksController.createStock)

router.post("/:sid", stocksController.udpateStockById)

// router.delete("/:pid", stocksController.deletePlaceById)

module.exports = router;