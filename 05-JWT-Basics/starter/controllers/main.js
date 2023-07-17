const {BadRequestError} = require('../errors')
const jwt = require('jsonwebtoken')

const login = async (req,res) => {
    const {username, password} = req.body
    // mongo validation
    // Joi
    // check in the controller
    if(!username || !password){
        throw new BadRequestError('Please provide email and password')
    }
    const id = new Date().getDate()
    // keep payload small, better user experience
    // the secret needs to be loooooooong and coooooomplex and unguessable
    const token = jwt.sign({id,username}, process.env.JWT_SECRET, {expiresIn:'30d'})   // no password here
    res.status(200).json({msg: 'user created', token})
}

const dashboard = async (req,res) => {
    console.log(req.user);
    const luckyNumber = Math.random(Math.random()*100)
    res.status(200).json({msg:`Hello, ${req.user.username}`, secret: `Here is your authorized data, your lucky number is ${luckyNumber}`})
}

module.exports = {login, dashboard}