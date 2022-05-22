const express = require('express');
const router = express.Router();
//import the functions from database services
const {
    
    getOrderDetails,
    getOrderDetailsById,
    createOrderDetails,
    updateOrderDetailsById

} = require('../../../services/OrderServices/OrderDetails/dbOrderDetails.js');

//order details get methods
router.get('/', getOrderDetails);
router.get('/:id', getOrderDetailsById);

//order details post methods
router.post('/', createOrderDetails);

//order details put methods
router.put('/:id', updateOrderDetailsById);

//export the router
module.exports = router;
