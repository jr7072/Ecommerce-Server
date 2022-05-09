const express = require('express');
const router = express.Router();
const {
        
        getUserAddresses,
        getUserAddressesById,
        createNewUserAddress

      } = require('../../../services/Addresses/addressDB.js');

//user addresses get methods
router.get('/', getUserAddresses);
router.get('/:id', getUserAddressesById);

//user address post methods
router.post('/', createNewUserAddress);

module.exports = router;
