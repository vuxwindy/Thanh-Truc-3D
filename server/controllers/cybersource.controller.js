

const {buildPaymentForm} = require('../services/cybersource.service');
const { paymentVnPt } = require('../services/cybersource.service');
const db = require('../models');

async function showPaymentForm(req, res) {
    const amount = req.params.amount;
    const currency = req.params.currency;
    const transaction = req.params.transaction;
    const paymentUrl = await paymentVnPt(amount, currency, transaction);
    console.log("Payment URL:", paymentUrl);
    return res.json({ paymentUrl });

}
const recivePayment = async (req, res) => {
    console.log("===== CyberSource Callback Received =====");
try {
        const decision = req.body.decision;
        const transactionId = req.body.transaction_id;
        const transaction_id_send = req.body.req_transaction_uuid; // CyberSource thường gửi mã đơn ở trường này

        if (decision && decision.toUpperCase() === "ACCEPT") {
            console.log(`Thanh toán thành công! Transaction ID: ${transactionId}`);

            // Cập nhật đơn hàng trong DB
            await db.Order.update(
                {
                    status: 'completed',
                    transaction_id: transactionId
                },
                { where: { transaction_id_send: transaction_id_send } }
            );

            // gui mail 


        } else {
            console.warn(`Thanh toán thất bại hoặc bị từ chối! Decision: ${decision}, Reason: ${req.body.reason_code}`);

            // Nếu muốn lưu trạng thái thất bại
            await db.Order.update(
                { status: 'failed' },
                { where: { transaction_id_send: transaction_id_send } }
            );
        }

        // res.status(200).send("OK"); // Quan trọng để CyberSource nhận là đã xử lý

    } catch (err) {
        console.error("Lỗi xử lý callback CyberSource:", err);
        // res.status(500).send("Internal Server Error");
    }

    // CyberSource yêu cầu trả về 200 OK
    // res.status(200).send("OK");
};

module.exports = {
    showPaymentForm,
    recivePayment
}
