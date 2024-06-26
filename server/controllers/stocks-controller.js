const HttpError = require("../models/http-error")
const Stock = require("../models/stock")
const Validator = require('validatorjs')

// const getPlaceById = async (req, res, next) => {
//     const placeId = req.params.pid
//     let place;

//     try{
//         place = await Place.findById(placeId)
        
//         if(!place){
//             return next(new HttpError("No place can be found with provided place id.", 404))
//         }
//     } catch(err) {
//         const error = new HttpError("Unable to find place", 400)
//         return next(error)
//     }
    
//     res.status(200)
//     res.json({ place: place.toObject({ getters: true }) })
// }

const getAllStocks = async (req, res, next) => {
    let matchCondition = {}

    if(req.query.search) {
        let searchTerm = req.query.search
        let parseNum = Number(req.query.search)
        searchTerm = isNaN(parseNum) ? searchTerm : parseNum;
        matchCondition.$or = []
        matchCondition.$or.push({lotNo: { $regex: new RegExp(searchTerm, 'i') }})
        matchCondition.$or.push({desc: { $regex: new RegExp(searchTerm, 'i') }})
        matchCondition.$or.push({qty: { $regex: new RegExp(searchTerm, 'i') }})
        matchCondition.$or.push({price: { $regex: new RegExp(searchTerm, 'i') }})
    }

    if(req.query.from_date) {
        let fromDate = new Date(req.query.from_date)
        matchCondition.date = { $gte: fromDate }
    } 
    
    if(req.query.to_date) {
        let toDate = new Date(req.query.to_date)
        matchCondition.date = { $lte: toDate }
    }
    
    let stocks;
    try{
        // stocks = await Stock.find()
        stocks = await Stock.aggregate([
            {
                $match: matchCondition
            },
            {
                $sort: {
                    date : -1
                }
            }
        ])
        
        if(!stocks || stocks.length == 0){
            return next(new HttpError("No Stock Available.", 404));
        }
    } catch(err){
        const error = new HttpError("Unable to find places", 400)
        return next(error)
    }
    res.status(200)
    res.json({ stocks })
}

const createStock = async (req, res, next) => {
    let { lotNo, desc, qty, price, date } = req.body
    
    let data = {
        lotNo: lotNo,
        desc: desc,
        qty: qty,
        price: price,
        date: date
    }

    let rules = {
        lotNo: 'required',
        desc: 'required',
        qty: 'required',
        price: 'required',
        date: 'required'
    }

    let validation = new Validator(data, rules)

    if(validation.fails()){
        const error = new HttpError("Invalid Fields!", 400)
        return next(error)
    }

    let stock = new Stock({
        lotNo: lotNo,
        desc: desc,
        qty: qty,
        price: price,
        date: date
    })

    try{
        await stock.save()
    } catch (err) {
        console.log(err)
        const error = new HttpError("Unable to create stock!", 400)
        return next(error)
    }

    res.status(201);
    res.json({ stock })
}

// const udpatePlaceById = async (req, res, next) => {
//     let placeId = req.params.pid;
//     let { name, desc } = req.body;

//     let place;
//     try{
//         place = await Place.findById(placeId)
        
//         if(!place){
//             return next(new HttpError("No place can be found with provided place id.", 404))
//         }
//     } catch(err) {
//         const error = new HttpError("Unable to find place", 400)
//         return next(error)
//     }

//     place.name = name
//     place.desc = desc

//     try{
//         await place.save()
//     } catch (err) {
//         console.log(err)
//         const error = new HttpError("Unable to update place!", 400)
//         return next(error)
//     }

//     res.status(200);
//     res.json({ place : place.toObject({ getters: true })})
// }

// const deletePlaceById = async (req, res, next) => {
//     let placeId = req.params.pid;

//     let place;
//     try{
//         place = await Place.findById(placeId)
        
//         if(!place){
//             return next(new HttpError("No place can be found with provided place id.", 404))
//         }
//     } catch(err) {
//         const error = new HttpError("Unable to find place", 400)
//         return next(error)
//     }
    
//     try{
//         await place.deleteOne()
//     } catch (err) {
//         console.log(err)
//         const error = new HttpError("Unable to delete place!", 400)
//         return next(error)
//     }

//     res.status(200);
//     res.json({ message: 'Place Deleted' })
// }

// exports.getPlaceById = getPlaceById
exports.getAllStocks = getAllStocks
exports.createStock = createStock
// exports.udpatePlaceById = udpatePlaceById
// exports.deletePlaceById = deletePlaceById