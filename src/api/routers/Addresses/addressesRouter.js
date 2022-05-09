const express = require('express');
const router = express.Router();
const {
        
        getUserAddresses,
        getUserAddressesById

      } = require('../../../services/Addresses/addressDB.js');

//user addresses get methods
router.get('/', getUserAddresses);
router.get('/:id', getUserAddressesById);

module.exports = router;
