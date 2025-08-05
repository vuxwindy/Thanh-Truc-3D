

const {buildPaymentForm} = require('../services/cybersource.service');

function showPaymentForm(req, res) {
    const amount = req.params.amount;
    const currency = req.params.currency;
    const formHtml = buildPaymentForm(amount, currency);
    res.send(formHtml);
}

module.exports = {
    showPaymentForm
}
