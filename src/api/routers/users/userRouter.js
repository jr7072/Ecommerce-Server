const express = require('express');
const router = express.Router();
const {getUsersFunc, getUserByIdFunc}  = require('../../../services/userdb.js');

router.get('/', getUsersFunc);

router.get('/:id', getUserByIdFunc);

module.exports = router;
