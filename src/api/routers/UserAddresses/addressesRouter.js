const express = require('express');
const router = express.Router();
const {
        
        getUserAddresses,
        getUserAddressesById,
        createNewUserAddress,
        updateAddressById,
        deleteAddressById

      } = require('../../../services/UserServices/Addresses/addressDB.js');

//user addresses get methods
router.get('/', getUserAddresses);
router.get('/:id', getUserAddressesById);

//user address post methods
router.post('/', createNewUserAddress);

//user address put methods
router.put('/:id', updateAddressById);

//user address delete methods
router.delete('/:id', deleteAddressById);

module.exports = router;
