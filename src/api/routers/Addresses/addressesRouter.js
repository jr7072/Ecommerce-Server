const express = require('express');
const router = express.Router();
const {
        
        getUserAddresses    

      } = require('../../../services/Addresses/addressDB.js');

//user addresses get methods
router.get('/', getUserAddresses);

module.exports = router;
