const express = require('express');
const router = express.Router();
const {
    
    getProducts,
    getProductsById,
    createProducts,
    updateProductsById,
    deleteProductsById

} = require('../../../services/ProductServices/Products/dbProducts.js');

//products get methods
router.get('/', getProducts);
router.get('/:id', getProductsById);

//products post methods
router.post('/', createProducts);

//products put methods
router.put('/:id', updateProductsById);

//products delete methods
router.delete('/:id', deleteProductsById);

module.exports = router;
