
const crypto = require('crypto')
const { ACCESS_KEY, PROFILE_ID, SECRET_KEY, CYBERSOURCE_URL } = require('../config/cybersource.config');

function sign(params, secretKey) {
    const signedFieldNames = params["signed_field_names"].split(',');
    const dataToSign = signedFieldNames.map(field => `${field}=${params[field]}`).join(',');
    const hmac = crypto.createHmac('sha256', secretKey);
    hmac.update(dataToSign);
    return Buffer.from(hmac.digest()).toString('base64');
}

function buildPaymentForm(amount, currency) {
    const transaction_uuid = crypto.randomUUID();
    const signed_date_time = new Date().toISOString().split('.')[0] + 'Z';

    const params = {
        access_key: ACCESS_KEY,
        profile_id: PROFILE_ID,
        transaction_uuid,
        signed_field_names: 'access_key,profile_id,transaction_uuid,signed_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency',
        signed_date_time,
        locale: 'en',
        transaction_type: 'sale',
        reference_number: 'ORDER_' + Date.now(),
        amount,
        currency
    };

    const signature = sign(params, SECRET_KEY);
    params.signature = signature;

    let html = `<html><body onload="document.forms[0].submit()">
  <form method="post" action="${CYBERSOURCE_URL}">`;

    for (const [key, value] of Object.entries(params)) {
        html += `<input type="hidden" name="${key}" value="${value}"/>\n`;
    }

    html += `</form></body></html>`;

    return html;
}

module.exports = {
    buildPaymentForm
};
