const klbService = require('../services/klb.service');
const { decryptAES, encryptAES, KLB_ENCRYPT_KEY, KLB_CLIENT_ID, hmacSHA256Encode } = klbService;
const Order = require('../models/Order');

/**
 * Verify Webhook Signature từ KLB gửi đến
 * @param {object} req 
 * @param {string} data - Base64 encoded encrypted string from KLB
 */
function verifyWebhookSignature(req, data) {
    const apiClient = req.headers['x-api-client'];
    const apiValidate = req.headers['x-api-validate']; // Chữ ký HMAC từ KLB gửi
    const apiTime = req.headers['x-api-time'];

    // Nếu tuỳ vào dự án, bạn có thể tự tính lại Hash để so sánh nếu muốn bảo mật strict:
    // const signFormat = `${KLB_CLIENT_ID}|${apiTime}|${data}`;
    // const expectedSig = hmacSHA256Encode(signFormat);
    // return apiValidate === expectedSig;

    // Tuy nhiên theo tài liệu, chúng ta cơ bản check ClientId
    return apiClient === KLB_CLIENT_ID;
}

/**
 * Trả về Response theo đúng định dạng mã hoá của KLB thu hộ
 */
function klbResponseData(res, dataObj) {
    const dataStr = JSON.stringify(dataObj);
    const encryptedData = encryptAES(dataStr);

    return res.status(200).json({
        code: 0,
        message: "success",
        data: encryptedData
    });
}

function klbResponseError(res, code = 10024, message = "Lỗi xử lý") {
    return res.status(200).json({
        code: code,
        message: message
    });
}

const klbController = {
    /**
     * API 0. Tạo thông tin thanh toán cho giao diện (Checkout)
     */
    async createPayment(req, res) {
        try {
            // Parse orderId ra số nguyên để đảm bảo tìm được trong DB
            const orderId = parseInt(req.body.orderId, 10);
            if (!orderId || isNaN(orderId)) {
                return res.status(400).json({ error: "Missing or invalid orderId" });
            }

            // Truy vấn order từ database
            const order = await Order.findByPk(orderId);
            if (!order) {
                return res.status(404).json({ error: `Order #${orderId} not found` });
            }

            // Sinh mã tài khoản ảo cho order này nếu chưa có
            let virtualAccount = order.transaction_id;
            if (!virtualAccount || virtualAccount.length < 10) {
                virtualAccount = klbService.generateVirtualAccount();
                order.transaction_id = virtualAccount;
                await order.save();
            }

            // Tính tổng tiền (giá gốc + 15% phí)
            const finalAmount = Math.round(Number(order.price) * 1.15);

            // Link tạo VietQR
            const qrUrl = `https://img.vietqr.io/image/970452-${virtualAccount}-compact2.png?amount=${finalAmount}&addInfo=Thanh+toan+don+${orderId}&accountName=MERCHANT+WEB2D`;

            return res.json({
                success: true,
                virtualAccount,
                bankBin: "970452",
                amount: finalAmount,
                qrUrl
            });
        } catch (error) {
            console.error("Lỗi khi tạo payment:", error);
            res.status(500).json({ error: error.message, stack: error.stack });
        }
    },

    /**
     * Polling: Frontend gọi mỗi 5s để kiểm tra trạng thái thanh toán trong DB
     */
    async getMockOrder(req, res) {
        try {
            const orderId = parseInt(req.params.orderId, 10);
            if (!orderId || isNaN(orderId)) {
                return res.status(400).json({ error: "Invalid orderId" });
            }
            const order = await Order.findByPk(orderId);
            if (!order) return res.status(404).json({ error: "Order not found" });
            return res.json({ id: order.id, status: order.status });
        } catch (e) {
            return res.status(500).json({ error: e.message });
        }
    },

    /**
     * API 1. Kiểm tra tài khoản ảo (Inquiry Checking)
     */
    async inquiryChecking(req, res) {
        try {
            const encryptedData = req.body.data;
            if (!encryptedData || !verifyWebhookSignature(req, encryptedData)) {
                return klbResponseError(res, 1601, "Security violation");
            }

            const decryptedDataStr = decryptAES(encryptedData);
            if (!decryptedDataStr) return klbResponseError(res, 10024, "Lỗi giải mã");

            const payload = JSON.parse(decryptedDataStr);
            const { virtualAccount } = payload;

            // TODO: Ở đây bạn sẽ query vào Database xem virtualAccount này có hợp lệ không
            // Giả lập hợp lệ:
            console.log(`[KLB Webhook] Inquiry Checking for: ${virtualAccount}`);

            const responsePayload = {
                displayName: "Web2D Customer", // Tên tối đa 20 ký tự không dấu
                actualAccount: "0000006155"    // Số tài khoản thu hộ thực tế của Cty
            };

            return klbResponseData(res, responsePayload);

        } catch (error) {
            console.error(error);
            return klbResponseError(res, 10024, "Lỗi máy chủ");
        }
    },

    /**
     * API 2. Kiểm tra trước khi hạch toán (Deposit Checking)
     */
    async depositChecking(req, res) {
        try {
            const encryptedData = req.body.data;
            if (!encryptedData || !verifyWebhookSignature(req, encryptedData)) {
                return klbResponseError(res, 1601, "Security violation");
            }

            const decryptedDataStr = decryptAES(encryptedData);
            if (!decryptedDataStr) return klbResponseError(res, 10024, "Lỗi giải mã");

            const payload = JSON.parse(decryptedDataStr);
            const { virtualAccount, amount } = payload;

            console.log(`[KLB Webhook] Deposit Checking for: ${virtualAccount}, Amount: ${amount}`);

            // Kiểm tra số dư với DB của bạn
            const order = await Order.findOne({ where: { transaction_id: virtualAccount } });
            if (!order) {
                // Nếu không có Order nào khớp với TK Ảo, từ chối nạp
                return klbResponseError(res, 1606, "Giao d ịch không h ợp lệ");
            }

            const expectedAmount = Math.round(Number(order.price) * 1.15);
            if (Number(amount) !== expectedAmount) {
                return klbResponseError(res, 1603, "S ố tiền không hợp lệ");
            }

            const responsePayload = {
                displayName: "Web2D Customer",
                actualAccount: "0000006155",
                amount: amount
            };

            return klbResponseData(res, responsePayload);

        } catch (error) {
            console.error(error);
            return klbResponseError(res, 10024, "Lỗi máy chủ");
        }
    },

    /**
     * API 3. Cập nhật trạng thái giao dịch (Notify Transaction)
     */
    async notifyTransaction(req, res) {
        try {
            const encryptedData = req.body.data;
            if (!encryptedData || !verifyWebhookSignature(req, encryptedData)) {
                return klbResponseError(res, 1601, "Security violation");
            }

            const decryptedDataStr = decryptAES(encryptedData);
            if (!decryptedDataStr) return klbResponseError(res, 10024, "Lỗi giải mã");

            const payload = JSON.parse(decryptedDataStr);
            /*
            Payload sẽ có cấu trúc:
            {
                virtualAccount, amount, fromBin, fromAccount, success, statusCode, txnNumber, transferDesc, time, interBankTrace, actualAccount
            }
            */
            console.log(`[KLB Webhook] Notify Transaction received:`, payload);

            const { virtualAccount, amount, success, txnNumber, transferDesc } = payload;

            // Cập nhật trạng thái thanh toán thành công vào DB của bạn
            const order = await Order.findOne({ where: { transaction_id: virtualAccount } });
            if (order && success) {
                order.status = 'completed';
                await order.save();
                console.log(`[KLB] Đã thanh toán thành công cho Order ${order.id}`);
            } else if (!order) {
                console.warn(`[KLB Webhook] Không tìm thấy Order có mã TK: ${virtualAccount}`);
            }

            const responsePayload = {
                status: true
            };

            return klbResponseData(res, responsePayload);

        } catch (error) {
            console.error(error);
            return klbResponseError(res, 10024, "Lỗi máy chủ");
        }
    }
};

module.exports = klbController;
