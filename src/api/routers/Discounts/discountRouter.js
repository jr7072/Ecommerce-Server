const express = require('express');
const router = express.Router();
const{
    
    getDiscounts,
    getDiscountsById,
    createDiscounts,
    updateDiscountsById

} = require('../../../services/ProductServices/Discounts/dbDiscounts.js');

//discount get methods
router.get('/', getDiscounts);
router.get('/:id', getDiscountsById);

//discount post methods
router.post('/', createDiscounts);

//discount put methods
router.put('/:id', updateDiscountsById);

module.exports = router;
