const express = require('express');
const router = express.Router();
const {
    
    getProducts,
    getProductsById,
    createProducts

} = require('../../../services/ProductServices/Products/dbProducts.js');

//products get methods
router.get('/', getProducts);
router.get('/:id', getProductsById);

//products post methods
router.post('/', createProducts);

module.exports = router;
