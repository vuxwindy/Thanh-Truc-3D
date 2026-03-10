const crypto = require('crypto');

const KLB_CLIENT_ID = process.env.KLB_CLIENT_ID;
const KLB_ENCRYPT_KEY = process.env.KLB_ENCRYPT_KEY;
const KLB_SECRET_KEY = process.env.KLB_SECRET_KEY;
const KLB_HOST = process.env.KLB_HOST;
const KLB_PARTNER_CODE = process.env.KLB_PARTNER_CODE || '1629';

/**
 * Validates that required KLB configuration is present
 */
function checkConfig() {
    if (!KLB_CLIENT_ID || !KLB_ENCRYPT_KEY || !KLB_SECRET_KEY || !KLB_HOST) {
        console.warn('KLB configuration is missing in environment variables.');
        return false;
    }
    return true;
}

/**
 * Thể hiện thuật toán GetCheckDigit theo chuẩn của KLB
 * @param {string} number 
 */
function getCheckDigit(number) {
    let sum = 0;
    for (let i = 0; i < number.length; i++) {
        let digit = parseInt(number.substring(i, i + 1), 10);
        if (i % 2 === 0) {
            digit = digit * 2;
            if (digit > 9) {
                digit = Math.floor(digit / 10) + (digit % 10);
            }
        }
        sum += digit;
    }
    const mod = sum % 10;
    return mod === 0 ? 0 : 10 - mod;
}

/**
 * Tạo tài khoản ảo (Virtual Account)
 * @param {string} prefix - Tiền tố (Merchant code) gồm 4 ký tự
 */
function generateVirtualAccount(prefix = KLB_PARTNER_CODE) {
    const today = new Date();
    const yy = String(today.getFullYear()).slice(-2);
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');

    // 6 random digits
    const randomNum = Math.floor(Math.random() * 999999).toString().padStart(6, '0');

    let res = `${prefix}${yy}${mm}${dd}${randomNum}`;
    const checkDigit = getCheckDigit(res);

    return `${res}${checkDigit}`;
}

/**
 * Mã hóa AES dữ liệu (Base64 chuỗi sau mã hóa)
 * @param {string} data - Chuỗi JSON
 * @param {string} encryptKey - Key mã hóa (hex data)
 * @returns {string} Chuỗi Base64 đã mã hóa
 */
function encryptAES(data, encryptKey = KLB_ENCRYPT_KEY) {
    try {
        const keyBuffer = Buffer.from(encryptKey, 'hex');
        const iv = keyBuffer.subarray(0, 16); // 16 bytes đầu làm IV

        const cipher = crypto.createCipheriv('aes-256-cbc', keyBuffer, iv);
        let encrypted = cipher.update(data, 'utf8', 'base64');
        encrypted += cipher.final('base64');

        return encrypted;
    } catch (error) {
        console.error('KLB Encrypt error:', error);
        return null;
    }
}

/**
 * Giải mã AES dữ liệu
 * @param {string} data - Chuỗi Base64 cần giải mã
 * @param {string} encryptKey - Key giải mã (hex data)
 * @returns {string} Chuỗi JSON đã giải mã
 */
function decryptAES(data, encryptKey = KLB_ENCRYPT_KEY) {
    try {
        const keyBuffer = Buffer.from(encryptKey, 'hex');
        const iv = keyBuffer.subarray(0, 16);

        const decipher = crypto.createDecipheriv('aes-256-cbc', keyBuffer, iv);
        let decrypted = decipher.update(data, 'base64', 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted;
    } catch (error) {
        console.error('KLB Decrypt error:', error);
        return null;
    }
}

/**
 * Hash HMAC SHA256 cho cấu trúc chữ ký
 * @param {string} data - Plaintext cần ký
 * @param {string} secretKey - Secret Key
 * @returns {string} Chuỗi hex mã hóa
 */
function hmacSHA256Encode(data, secretKey = KLB_SECRET_KEY) {
    try {
        return crypto.createHmac('sha256', secretKey).update(data, 'utf8').digest('hex');
    } catch (error) {
        console.error('KLB HMAC encode error:', error);
        return null;
    }
}

/**
 * Wrapper gọi API tới KLB
 * @param {string} path - API path (e.g. /api/external/corebank/v1/getBalance)
 * @param {object} payloadObj - Plain object chứa data body
 * @returns {object} API Response
 */
async function callKlbApi(path, payloadObj) {
    if (!checkConfig()) {
        throw new Error("Missing KLB configurations.");
    }

    const timestamp = Date.now().toString();
    const payloadStr = JSON.stringify(payloadObj);

    // 1. Mã hóa Payload AES
    const encryptedData = encryptAES(payloadStr);

    // 2. Format dữ liệu để tạo chữ ký
    const signFormat = `${KLB_CLIENT_ID}|${timestamp}|${encryptedData}`;

    // 3. Tạo chữ ký x-api-validate
    const signature = hmacSHA256Encode(signFormat);

    const headers = {
        'x-api-client': KLB_CLIENT_ID,
        'x-api-validate': signature,
        'x-api-time': timestamp,
        'Content-Type': 'application/json'
    };

    const body = JSON.stringify({ data: encryptedData });
    const url = `${KLB_HOST}${path}`;

    console.log(`[KLB] Request to ${url}`);

    try {
        // Có thể cần dùng require('node-fetch') hoặc axios, ở node > 18 dùng fetch có sẵn.
        // Dự án Express thường có axios
        const axios = require('axios');
        const response = await axios.post(url, body, {
            headers,
            validateStatus: function (status) {
                return status < 600; // Phân tích các mã lỗi > 200 mà bank trả về
            }
        });
        const resData = response.data;

        if (response.status !== 200 || !resData || resData.code !== 0) {
            console.error(`[KLB] Error response from bank (HTTP ${response.status}):`, resData?.message || resData);
            return resData;
        }

        // 4. Giải mã dữ liệu response trả về
        if (resData.data) {
            const decryptedString = decryptAES(resData.data);
            resData.decryptedData = JSON.parse(decryptedString);
        }
        return resData;

    } catch (error) {
        console.error('[KLB] HTTP Request failed:', error.message);
        throw error;
    }
}

/**
 * ====================
 * CHI HỘ (PAYOUT) APIs
 * ====================
 */

/**
 * 1. Lấy thông tin tài khoản (Nội bộ / Napas)
 */
async function getBeneficiary({ accountNo, bin, target = 'ACCOUNT_NO' }) {
    const payload = { accountNo, bin, target };
    return callKlbApi('/api/external/corebank/v1/getBeneficiary', payload);
}

/**
 * 2. Lấy số dư tài khoản
 */
async function getBalance({ accountNo }) {
    const payload = { accountNo };
    return callKlbApi('/api/external/corebank/v1/getBalance', payload);
}

/**
 * 3. Chuyển khoản (Napas 247 hoặc Nội bộ)
 */
async function fundTransfer({ referenceNumber, method = 'NAPAS_247', accountNo, toAccountNo, target = 'ACCOUNT_NO', bin, amount, description }) {
    const payload = {
        referenceNumber,
        method, // NAPAS_247 hoặc CITAD (nếu hỗ trợ) hoặc nội bộ tuỳ bank
        accountNo, // TK nguồn
        toAccountNo, // TK đích
        target,
        bin,
        amount,
        description
    };
    return callKlbApi('/api/external/corebank/v1/fundTransfer', payload);
}

/**
 * 4. Truy vấn trạng thái chuyển khoản
 */
async function queryFundTransfer({ referenceNumber }) {
    const payload = { referenceNumber };
    return callKlbApi('/api/external/corebank/v1/queryFundTransfer', payload);
}

module.exports = {
    KLB_CLIENT_ID,
    KLB_ENCRYPT_KEY,
    generateVirtualAccount,
    encryptAES,
    decryptAES,
    hmacSHA256Encode,
    getBeneficiary,
    getBalance,
    fundTransfer,
    queryFundTransfer
};
