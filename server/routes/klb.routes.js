const express = require('express');
const klbController = require('../controllers/klb.controller');

const router = express.Router();

/**
 * KLB sẽ gọi vào các endpoint này, payload nằm ở trong `req.body.data`
 * Các header yêu cầu đều chứa x-api-client, x-api-validate, x-api-time
 */

router.post('/createPayment', klbController.createPayment);
router.get('/order-status/:orderId', klbController.getOrderStatus);
router.post('/inquiryChecking', klbController.inquiryChecking);
router.post('/depositChecking', klbController.depositChecking);
router.post('/notifyTransaction', klbController.notifyTransaction);

module.exports = router;
