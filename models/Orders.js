const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxlength: 80
    },
    country: {
        type: String,
        maxlength: 80,
        default: 'Russia'
    },
    region: {
        type: String,
        required: true,
        minLength: 2,
        maxlength: 80
    },
    city: {
        type: String,
        required: true,
        minLength: 2,
        maxlength: 80
    },
    street: {
        type: String,
        required: true,
        minLength: 2,
        maxlength: 80
    },
    index: {
        type: String,
        required: true,
        minLength: 6,
        maxlength: 8
    },
    house: {
        type: String,
        required: true,
        minLength: 1,
        maxlength: 8
    },
    appartment: {
        type: String,
        maxlength: 8
    },
    phone: {
        type: String,
        minLength: 6,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minLength: 6,
        maxlength: 40
    },
    variant: {
        type: String,
        minLength: 1,
        maxlength: 20
    },
    quant: {
        type: Number,
        require: true,
        minLength: 6,
        maxlength: 8
    },
    status: {
        type: String,
        default: 'created',
        enum: ['created', 'sent', 'done']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Orders', orderSchema)