const Orders = require('../models/Orders')


const getAllOrders = async (req, res) => {
    try {
        const {sort} = req.query
        let orders
        switch (sort) {
            case ('date'):
                orders = await Orders.find().sort({createdAt: -1})
                break
            case ('name'):
                orders = await Orders.find().sort({name: 1})
                break
            default:
                orders = await Orders.find()
                break
        }
        res.status(200).json({orders, count: orders.length})
    } catch (error) {
        res.status(404).json('Orders not found')
    }
}

const getSingleOrder = async (req, res) => {
    try {
        const {params: {id: orderId}} = req
        const order = await Orders.findOne({_id: orderId})
        if (!order) {
            res.status(404).json('Order not found')
        }
        res.status(200).json({order})
    } catch (error) {
        res.status(404).json('Orders not found')
    }
}

const createOrder = async (req, res) => {
    try {
        const order = await Orders.create(req.body)
        res.status(201).json({order})
    } catch (error) {
        res.status(404).json('Order not created')
    }
}

const updateOrder = async (req, res) => {
    try {
        const {params: {id: orderId}} = req
        const order = await Orders.findByIdAndUpdate({
            _id: orderId
        }, req.body, {new: true, runValidators: true})
        res.status(201).json({order})
    } catch (error) {
        res.status(404).json('Order not found')
    }
}

const deleteOrder = async (req, res) => {
    try {
        const {params: {id: orderId}} = req
        const order = await Orders.findByIdAndDelete({
            _id: orderId
        })
        res.status(200).json({msg: 'Successfully deleted'})
    } catch (error) {
        res.status(404).json('Orders not found')
    }
}


module.exports = {
    getAllOrders,
    getSingleOrder,
    createOrder,
    updateOrder,
    deleteOrder
}