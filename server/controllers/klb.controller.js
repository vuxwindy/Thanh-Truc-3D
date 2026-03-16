const klbService = require('../services/klb.service');
const { decryptAES, encryptAES, KLB_ENCRYPT_KEY, KLB_CLIENT_ID, hmacSHA256Encode } = klbService;
const Order = require('../models/Order');

// Số tài khoản thu hộ của đối tác tại KLB (được KLB cấp)
const KLB_ACCOUNT_CHUYEN_THU = process.env.KLB_ACCOUNT_CHUYEN_THU || '0000006155';
// Host VietQR (sandbox dùng uat.vietqr.vn, production dùng img.vietqr.io)
const VIETQR_HOST = process.env.VIETQR_HOST || 'https://img.vietqr.io';
// URL frontend để redirect sau khi thanh toán
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

/**
 * Verify Webhook Signature từ KLB gửi đến
 * @param {object} req 
 * @param {string} data - Base64 encoded encrypted string from KLB
 */
function verifyWebhookSignature(req, data) {
    const apiClient = req.headers['x-api-client'];
    const apiValidate = req.headers['x-api-validate']; // Chữ ký HMAC từ KLB gửi
    const apiTime = req.headers['x-api-time'];

    // Debug logging — xem KLB gửi gì
    console.log(`[KLB Webhook] Incoming headers:`);
    console.log(`  x-api-client: "${apiClient}"`);
    console.log(`  x-api-time: "${apiTime}"`);
    console.log(`  x-api-validate: "${apiValidate}"`);
    console.log(`  Expected KLB_CLIENT_ID: "${KLB_CLIENT_ID}"`);
    console.log(`  KLB_CLIENT_ID type: ${typeof KLB_CLIENT_ID}`);

    // Kiểm tra headers bắt buộc
    if (!apiClient || !apiTime) {
        console.error('[KLB Webhook] FAIL: Missing required headers (x-api-client or x-api-time)');
        return false;
    }

    // So sánh Client ID
    if (apiClient !== KLB_CLIENT_ID) {
        console.error(`[KLB Webhook] FAIL: Client ID mismatch! got="${apiClient}", expected="${KLB_CLIENT_ID}"`);
        return false;
    }

    // Verify HMAC signature (warn-only, không block — bật strict khi đã xác nhận hoạt động)
    if (apiValidate && data) {
        const signFormat = `${apiClient}|${apiTime}|${data}`;
        const expectedSig = hmacSHA256Encode(signFormat);
        if (apiValidate !== expectedSig) {
            console.warn(`[KLB Webhook] WARNING: HMAC signature mismatch (not blocking)`);
            console.warn(`  Received:  "${apiValidate}"`);
            console.warn(`  Computed:  "${expectedSig}"`);
        } else {
            console.log(`[KLB Webhook] HMAC signature verified OK`);
        }
    }

    console.log('[KLB Webhook] Verification PASSED');
    return true;
}

/**
 * Trả về Response theo đúng định dạng mã hoá của KLB thu hộ
 */
function klbResponseData(res, dataObj) {
    const dataStr = JSON.stringify(dataObj);
    const encryptedData = encryptAES(dataStr);

    // Thêm response headers theo spec KLB (RESPONSE HEADER: Tương tự Request)
    const timestamp = Date.now().toString();
    const signFormat = `${KLB_CLIENT_ID}|${timestamp}|${encryptedData}`;
    const signature = hmacSHA256Encode(signFormat);

    res.set({
        'x-api-client': KLB_CLIENT_ID,
        'x-api-validate': signature,
        'x-api-time': timestamp
    });

    return res.status(200).json({
        code: 0,
        message: "success",
        data: encryptedData
    });
}

function klbResponseError(res, code = 10024, message = "Lỗi xử lý") {
    // Thêm response headers cho cả error response
    const timestamp = Date.now().toString();
    const signFormat = `${KLB_CLIENT_ID}|${timestamp}|`;
    const signature = hmacSHA256Encode(signFormat);

    res.set({
        'x-api-client': KLB_CLIENT_ID,
        'x-api-validate': signature,
        'x-api-time': timestamp
    });

    return res.status(200).json({
        code: code,
        message: message,
        data: null
    });
}

const klbController = {
    /**
     * API 0. Tạo thông tin thanh toán cho giao diện (Checkout)
     */
    async createPayment(req, res) {
        try {
            const { orderId } = req.body;
            if (!orderId) return res.status(400).json({ error: "Missing orderId" });

            const order = await Order.findByPk(orderId);
            if (!order) return res.status(404).json({ error: "Order not found" });

            // Sinh mã tài khoản ảo cho order này nếu chưa có
            let virtualAccount = order.transaction_id;
            if (!virtualAccount || virtualAccount.length < 10) {
                virtualAccount = klbService.generateVirtualAccount();
                order.transaction_id = virtualAccount;
                await order.save();
            }

            // Mặc định phí ví dụ 15% (như ở frontend đang tính)
            const finalAmount = Math.round(Number(order.price) * 1.15);

            /**
             * Theo quy trình KLB:
             * - Số TK thụ hưởng trong QR = Số tài khoản ảo (virtual account)
             *   KLB sẽ dùng tiền tố 1629 để định danh merchant và dẫn tiền về đúng TK thu hộ.
             * - addInfo = nội dung chuyển khoản (khách phải điền đúng để KLB match giao dịch)
             *   Ở đây đặt virtualAccount làm addInfo để KLB có thể gọi API inquiryChecking đúng.
             * Ref: PDF mục III Bước 3 "số TK thụ hưởng là số tài khoản ảo"
             */
            const encodedAddInfo = encodeURIComponent(virtualAccount);
            const encodedAccountName = encodeURIComponent('CONG TY TNHH LUCENTIS');
            const qrUrl = `${VIETQR_HOST}/image/970452-${virtualAccount}-compact2.png?amount=${finalAmount}&addInfo=${encodedAddInfo}&accountName=${encodedAccountName}`;

            return res.json({
                success: true,
                virtualAccount,          // Đây là số TK thụ hưởng (TK ảo) khách phải chuyển đến
                bankAccount: KLB_ACCOUNT_CHUYEN_THU,  // TK mẹ thu hộ (để hiển thị thêm cho rõ)
                bankBin: "970452",       // BIN Kiên Long Bank
                amount: finalAmount,
                qrUrl
            });
        } catch (error) {
            console.error("Lỗi khi tạo payment:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    /**
     * API - Frontend polling để kiểm tra trạng thái thanh toán từ DB
     */
    async getOrderStatus(req, res) {
        try {
            const { orderId } = req.params;
            const order = await Order.findByPk(orderId);
            if (!order) return res.status(404).json({ error: "Order not found" });
            return res.json({ id: order.id, status: order.status, transaction_id: order.transaction_id });
        } catch (error) {
            console.error("Lỗi khi lấy trạng thái order:", error);
            return res.status(500).json({ error: "Internal server error" });
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

            // Xác minh tài khoản ảo thuộc đơn hàng nào trong DB
            const order = await Order.findOne({ where: { transaction_id: virtualAccount } });
            if (!order) {
                return klbResponseError(res, 1606, "Invalid virtual account");
            }

            const responsePayload = {
                displayName: "CONG TY TNHH LUCENTIS", // Tên tối đa 20 ký tự không dấu
                actualAccount: KLB_ACCOUNT_CHUYEN_THU  // Số tài khoản thu hộ thực tế của Cty
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
                displayName: "CONG TY TNHH LUCENTIS",
                actualAccount: KLB_ACCOUNT_CHUYEN_THU,
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
