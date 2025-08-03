

const {buildPaymentForm} = require('../services/cybersource.service');

function showPaymentForm(req, res) {
    const formHtml = buildPaymentForm();
    res.send(formHtml);
}

module.exports = {
    showPaymentForm
}
