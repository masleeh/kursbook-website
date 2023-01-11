const express = require('express')

const router = express.Router()

const {getAllOrders,
    getSingleOrder,
    createOrder,
    updateOrder,
    deleteOrder} = require('../controllers/orders')

router.route('/').get(getAllOrders).post(createOrder)
router.route('/:id').patch(updateOrder).delete(deleteOrder).get(getSingleOrder)

module.exports = router