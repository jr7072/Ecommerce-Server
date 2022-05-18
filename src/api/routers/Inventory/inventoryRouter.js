const express = require('express');
const router = express.Router();
const {
    
    getInventory,
    getInventoryById

} = require('../../../services/ProductServices/Inventory/dbInventory.js');

//inventory get methods
router.get('/', getInventory);
router.get('/:id', getInventoryById);

module.exports = router;
