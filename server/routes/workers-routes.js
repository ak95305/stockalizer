const express = require('express');
const workersController = require("../controllers/workers-controller");
const authToken = require('../middlewares/auth');

const router = express.Router();

// router.get("/:pid", stocksController.getPlaceById)

// router.get("/user/:uid", stocksController.getPlaceByUserId)

router.get("/", workersController.getAllWorkers)

router.post("/", workersController.createWorker)

// router.patch("/:pid", stocksController.udpatePlaceById)

// router.delete("/:pid", stocksController.deletePlaceById)

module.exports = router;