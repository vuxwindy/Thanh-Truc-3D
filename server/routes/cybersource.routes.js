const express = require("express");
const router = express.Router();

const {showPaymentForm} = require('../controllers/cybersource.controller');

router.get('/:amount/:currency', showPaymentForm);


module.exports = router;
