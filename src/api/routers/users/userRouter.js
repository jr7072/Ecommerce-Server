const express = require('express');
const router = express.Router();
const {
        
        getUsers,
        getUserById,
        createNewUser
      
      }  = require('../../../services/userdb.js');

//get methods
router.get('/', getUsers);
router.get('/:id', getUserById);

//post methods
router.post('/', createNewUser);


module.exports = router;
