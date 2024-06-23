const express = require('express')
const stocksRouter = require('./routes/stocks-routes')
const userRouter = require('./routes/users-routes')
const bodyParser = require('body-parser')
const HttpError = require('./models/http-error')
const mongoose = require("mongoose")
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

app.use(cors())

app.use(bodyParser.json())

app.use("/api/stock", stocksRouter)

app.use((req, res, next) => {
    throw new HttpError("Could not find this route", 404)
})

app.use((error, req, res, next) => {
    if(req.headerSent) {
        next(error)
    }
    res.status(error.code || 404)
    res.json({message: error.message || 'An Unkown Error Occurred!'})
})

mongoose.connect(process.env.APP_MONGO_DB_URL)
.then(()=>{
    console.log("Connecte to DB!")
    app.listen(process.env.APP_PORT);
})
.catch(err => console.log(err))
