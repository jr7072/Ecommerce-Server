const express = require('express');
const router = express.Router();
const {
    
    getInventory,
    getInventoryById,
    createInventory,
    updateInventoryById,
    deleteInventoryById

} = require('../../../services/ProductServices/Inventory/dbInventory.js');

//inventory get methods
router.get('/', getInventory);
router.get('/:id', getInventoryById);

//inventory post methods
router.post('/', createInventory);

//inventory put methods
router.put('/:id', updateInventoryById);

//inventory delete methods
router.delete('/:id', deleteInventoryById);

module.exports = router;
