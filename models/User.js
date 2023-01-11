const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { METHODS } = require('http')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please, provide name'],
        minlength: 6,
        maxlength: 40
    },
    password: {
        type: String,
        required: [true, 'Please, provide password'],
        minlength: 8
    }
})

// Password encryption
UserSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

// Comparing passwords
UserSchema.methods.comparePassword = async function(candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

// Creating Token
UserSchema.methods.createJWT = function() {
    return jwt.sign(
        { name: this.name }, 
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_LIFETIME} )
}


module.exports = mongoose.model('User', UserSchema)