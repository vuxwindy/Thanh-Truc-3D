const express = require("express");
const router = express.Router();

const {showPaymentForm, recivePayment} = require('../controllers/cybersource.controller');

router.get('/:amount/:currency/:transaction', showPaymentForm);

router.post('/payment-confirmation', recivePayment)


module.exports = router;
