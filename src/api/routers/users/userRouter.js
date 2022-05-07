const express = require('express');
const router = express.Router();
const {
        
        getUsers,
        getUserById,
        createNewUser,
        updateUser
      
      }  = require('../../../services/userdb.js');

//get methods
router.get('/', getUsers);
router.get('/:id', getUserById);

//post methods
router.post('/', createNewUser);

//put methods
router.put('/:id', updateUser);

module.exports = router;
