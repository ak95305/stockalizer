const express = require('express');
const stocksController = require("../controllers/stocks-controller");
const authToken = require('../middlewares/auth');

const router = express.Router();

// router.get("/:pid", stocksController.getPlaceById)

// router.get("/user/:uid", stocksController.getPlaceByUserId)

// router.post("/", authToken, stocksController.createPlace)
router.post("/", stocksController.createStock)

// router.patch("/:pid", stocksController.udpatePlaceById)

// router.delete("/:pid", stocksController.deletePlaceById)

module.exports = router;