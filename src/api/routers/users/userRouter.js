const express = require('express');
const router = express.Router();
const {
        
        getUsers,
        getUserById,
        createNewUser,
        updateUser,
        deleteUserById
      
      }  = require('../../../services/users/userdb.js');

//get methods
router.get('/', getUsers);
router.get('/:id', getUserById);

//post methods
router.post('/', createNewUser);

//put methods
router.put('/:id', updateUser);

//delete methods
router.delete('/:id', deleteUserById);

module.exports = router;
