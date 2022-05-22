const express = require('express');
const router = express.Router();
//import the functions from database services
const {
    
    getOrderDetails,
    getOrderDetailsById

} = require('../../../services/OrderServices/OrderDetails/dbOrderDetails.js');

//order details get methods
router.get('/', getOrderDetails);
router.get('/:id', getOrderDetailsById);

//export the router
module.exports = router;
