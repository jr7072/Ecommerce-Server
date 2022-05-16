const express = require('express');
const router = express.Router();
const {
    
    getUserPayments,
    getUserPaymentsById,
    createUserPayments,
    updateUserPaymentsById,
    deleteUserPaymentsById

} = require('../../../services/UserServices/Payments/paymentDB.js');

//user payments get methods
router.get('/', getUserPayments);
router.get('/:id', getUserPaymentsById);

//post methods
router.post('/', createUserPayments);

//put methods
router.put('/:id', updateUserPaymentsById);

//delete methods
router.delete('/:id', deleteUserPaymentsById);

module.exports = router;
