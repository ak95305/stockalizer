const HttpError = require("../models/http-error")
const Worker = require("../models/worker")
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

const getAllWorkers = async (req, res, next) => {
    let matchCondition = {}

    if(req.query.search) {
        let searchTerm = req.query.search
        let parseNum = Number(req.query.search)
        searchTerm = isNaN(parseNum) ? searchTerm : parseNum;
        matchCondition.$or = []
        matchCondition.$or.push({name: { $regex: new RegExp(searchTerm, 'i') }})
        matchCondition.$or.push({phonenumber: { $regex: new RegExp(searchTerm, 'i') }})
        matchCondition.$or.push({type: { $regex: new RegExp(searchTerm, 'i') }})
    }

    if(req.query.from_date) {
        let fromDate = new Date(req.query.from_date)
        matchCondition.date = { $gte: fromDate }
    } 
    
    if(req.query.to_date) {
        let toDate = new Date(req.query.to_date)
        matchCondition.date = { $lte: toDate }
    }
    
    let workers;
    try{
        workers = await Worker.aggregate([
            {
                $match: matchCondition
            },
            {
                $sort: {
                    date : -1
                }
            }
        ])
        
        if(!workers || workers.length == 0){
            return next(new HttpError("No Stock Available.", 404));
        }
    } catch(err){
        const error = new HttpError("Unable to find places", 400)
        return next(error)
    }
    res.status(200)
    res.json({ workers })
}

const createWorker = async (req, res, next) => {
    let { name, phonenumber, type } = req.body
    
    let data = {
        name: name,
        phonenumber: phonenumber,
        type: type,
    }

    let rules = {
        name: 'required',
        phonenumber: 'required',
        type: 'required'
    }

    let validation = new Validator(data, rules)

    if(validation.fails()){
        const error = new HttpError("Invalid Fields!", 400)
        return next(error)
    }

    let worker = new Worker({
        name: name,
        phonenumber: phonenumber,
        type: type
    })

    try{
        await worker.save()
    } catch (err) {
        console.log(err)
        const error = new HttpError("Unable to create stock!", 400)
        return next(error)
    }

    res.status(201);
    res.json({ worker })
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
exports.getAllWorkers = getAllWorkers
exports.createWorker = createWorker
// exports.udpatePlaceById = udpatePlaceById
// exports.deletePlaceById = deletePlaceById