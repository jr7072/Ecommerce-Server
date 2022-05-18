const express = require('express');
const router = express.Router();
const {
    
    getInventory,
    getInventoryById,
    createInventory,
    updateInventoryById

} = require('../../../services/ProductServices/Inventory/dbInventory.js');

//inventory get methods
router.get('/', getInventory);
router.get('/:id', getInventoryById);

//inventory post methods
router.post('/', createInventory);

//inventory put methods
router.put('/:id', updateInventoryById);

module.exports = router;
