const Validator = require('validatorjs')
const User = require('../models/user');
const HttpError = require('../models/http-error');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// get salt for bcrypt
const salt = bcrypt.genSaltSync(10);

const signup = async (req, res, next) => {
    let { email, password, name } = req.body;

    const data = {
        email: email,
        password: password,
        name: name
    }

    const rules = {
        email: 'required|email',
        password: 'required|min:1',
        name: 'required|min:3'
    }

    const validation = new Validator(data, rules)

    if(validation.fails()){
        const errors = validation.errors
        res.status(400)
        res.json({...errors})
    }

    let user;
    try{
        user = await User.findOne({ email: email })
        if(user === null) {
            user = new User({
                name: name,
                email: email,
                password: bcrypt.hashSync(password, salt)
            });
            user = await user.save()
        } else {
            const error = new HttpError('User Already Exits!', 400)
            return next(error)
        }
    } catch (err) {
        console.log(err)
        const error = new HttpError("Unable to signup user", 400)
        return next(error)
    }

    res.status(200)
    res.json({ user: user.toObject({ getters: true }) })
}

const login = async (req, res, next) => {
    const { email, password } = req.body

    const data = {
        email: email,
        password: password,
    }

    const rules = {
        email: 'required|email',
        password: 'required',
    }

    const validation = new Validator(data, rules)
    
    if(validation.fails()){
        const errors = validation.errors
        res.status(400)
        res.json({errors: errors})
    }

    let user;
    try{
        user = await User.findOne({ email: email })
        if(user == null){
            const error = new HttpError("User not found!", 404)
            return next(error)
        }
        if(bcrypt.compareSync(password, user.password)){
            user.token = jwt.sign({ userId: user.id, email: user.email }, "secret", { expiresIn: '1h' });
    
            await user.save()

            res.status(200)
            res.json({ user: user.toObject({ getters: true }) })
        } else {
            const error = new HttpError("Password not correct", 400)
            return next(error)
        }

    } catch (err) {
        console.log(err)
        const error = new HttpError("Unable to login user", 400)
        return next(error)
    }
}

const logout = async (req, res, next) => {
    if(req.userData == undefined) {
        const error = new HttpError('User not logged in', 400)
        return next(error)
    }

    try{
        const user = await User.findById(req.userData.userId)
        user.token = null
        
        user.save()
        
    } catch (err) {
        const error = new HttpError('User not logged in', 400)
        return next(error)
    }

    res.status(200)
    res.json({ userData: req.userData })
}

const getUsers = async (req, res, next) => {
    let { page, limit, search } = req.query
    page = parseInt(page)
    limit = parseInt(limit)

    let users = [];
    try {
        // users = await User.find({ 
        //     $or: [
        //         {name: { $regex: ".*" + search + ".*", $options: 'i' }},
        //         {email: { $regex: ".*" + search + ".*", $options: 'i' }}
        //     ]
        // })
        // .limit(typeof limit != undefined ? limit : null)
        // .skip(typeof page != undefined ? (page-1)*limit : null)

        users = await User.aggregate([
            {
                $lookup: {
                    from: 'places',
                    localField: '_id',
                    foreignField: 'createdBy'
                }
            },
            {
                $project: {
                    name: 1,
                    email: 1,
                    id: 1
                }
            },
            {
                $match: {
                    $or: [
                        {name: { $regex: ".*" + search + ".*", $options: 'i' }},
                        {email: { $regex: ".*" + search + ".*", $options: 'i' }}
                    ]
                }
            },
            {
                $addFields: {
                    id: "$_id"
                }
            },
            {
                $skip: (page-1)*limit
            },
            {
                $limit: limit
            }
        ])
        // res.json({users})
        // return next()

    } catch(err) {
        console.log(err)
        const error = new HttpError('Unable to fetch Users', 400)
        return next(error)
    }

    res.status(200)
    // res.json({ users: users.map( item => item.toObject({ getters: true }) ) })
    res.json({ users })
}


exports.signup = signup
exports.login = login   
exports.logout = logout 
exports.getUsers = getUsers 