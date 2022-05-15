const express = require('express');
const router = express.Router();
const {
        
        getUserAddresses,
        getUserAddressesById,
        createNewUserAddress,
        updateAddressById

      } = require('../../../services/Addresses/addressDB.js');

//user addresses get methods
router.get('/', getUserAddresses);
router.get('/:id', getUserAddressesById);

//user address post methods
router.post('/', createNewUserAddress);

//user address put methods
router.put('/:id', updateAddressById);

module.exports = router;
