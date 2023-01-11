const User = require('../models/User')

const register = async (req, res) => {
    try {
        const user = await User.create({...req.body})
        const token = user.createJWT()
        res.status(201).json({user: user.name, token})
    } catch (error) {
        res.status(401).json({msg: 'Couldnot create user'})
    }
}

const login = async (req, res) => {
    try {
        const {name, password} = req.body
        if (!name || !password) {
            res.status(401).json({msg: 'Please provide correct data'})
        }
        else {
        const user = await User.findOne({name})
        if (!user) {
            res.status(401).json({msg: 'User not found'})
        }
        const isPasswordCorrect = await user.comparePassword(password)
        if (!isPasswordCorrect) {
            res.status(401).json({msg: 'Password is incorrect'})
        }
        const token = user.createJWT()
        res.status(200).json({user: user.name, token})}
    } catch (error) {
        console.log(error);
    }
}

module.exports = {register, login}