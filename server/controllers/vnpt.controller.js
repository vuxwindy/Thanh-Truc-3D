const crypto = require('crypto');
const axios = require('axios');

// === CẤU HÌNH ===
const merId = "LUCENTIS01";
const encodeKey = "jmjrqmszeVz5+TQy0RHfrj9OZLXeaf/nkdCJItM+pyt6li0S4z+TnRm/S+Bb46MJ99+iXARV0zExmLpFNRRsYQ==";
const url = "https://pg.megapay.vn/pg_was/createlink.do";
const invoiceNo = "InvoiceNo00003";
const amount = "20000000";

// === HÀM TẠO MERCHANT TOKEN ===
function createMerchantToken(timeStamp, invoiceNo, merId, amount, linkExptime, encodeKey) {
    const merchantStructure = timeStamp + invoiceNo + merId + amount + linkExptime + encodeKey;
    const sha256hex = crypto.createHash('sha256').update(merchantStructure).digest('hex');
    console.log("Merchant Token:", sha256hex);
    return sha256hex;
}

// === HÀM LẤY THỜI GIAN HẾT HẠN LINK ===
function getLinkExptime() {
    const now = new Date();
    now.setHours(now.getHours() + 1); // Cộng thêm 1 tiếng
    
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

// === HÀM GỬI REQUEST TẠO PAYMENT LINK ===
async function createPaymentLink() {
    try {
        // Tạo timestamp và linkExptime
        const timeStamp = String(Date.now());
        const linkExptime = getLinkExptime();
        
        // Tạo merchant token và signature
        const merchantToken = createMerchantToken(timeStamp, invoiceNo, merId, amount, linkExptime, encodeKey);
        const signature = crypto.createHash('sha256').update(invoiceNo + amount + encodeKey).digest('hex');
        
        // Chuẩn bị payload
        const payload = {
            merId: merId,
            currency: "VND",
            amount: amount,
            invoiceNo: invoiceNo,
            goodsNm: "San pham test",
            payType: "NO",
            buyerFirstNm: "Tuan",
            buyerLastNm: "Phung",
            buyerEmail: "tuanphungdinh2002@gmail.com",
            callBackUrl: "lucentis.it.com",
            notiUrl: "test.com.vn",
            reqDomain: "lucentis.it.com",
            descriptions: "test mua hang",
            merchantToken: merchantToken,
            userLanguage: "VN",
            timeStamp: timeStamp,
            windowColor: "#ef5459",
            hash: signature,
            linkExptime: linkExptime
        };
        
        console.log("Sending:", JSON.stringify(payload, null, 2));
        
        // Gửi request
        const response = await axios.post(url, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        console.log("Response:", response.data);
        return response.data;
        
    } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
        throw error;
    }
}

// === HÀM GIẢI MÃ PAYMENT LINK ===
function decryptPaymentLink(encryptedHex) {
    try {
        const key24 = encodeKey.substring(0, 24); // 24 ký tự đầu
        
        // Convert hex string to buffer
        const encryptedBuffer = Buffer.from(encryptedHex, 'hex');
        
        // Giải mã bằng 3DES (Triple DES)
        const decipher = crypto.createDecipheriv('des-ede3', key24, '');
        decipher.setAutoPadding(true);
        
        let decrypted = decipher.update(encryptedBuffer);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        
        const decryptedText = decrypted.toString('utf8');
        
        console.log("🔓 Decrypted paymentLink:");
        console.log(decryptedText);
        
        return decryptedText;
        
    } catch (error) {
        console.error("Decryption error:", error.message);
        throw error;
    }
}

// === SỬ DỤNG ===
// 1. Tạo payment link
createPaymentLink()
    .then(response => {
        console.log("✅ Payment link created successfully");
        
        // 2. Nếu có encrypted data từ response, giải mã nó
        // Ví dụ: nếu response có field "encryptedLink"
        // const decryptedLink = decryptPaymentLink(response.encryptedLink);
    })
    .catch(error => {
        console.error("❌ Failed to create payment link");
    });

// === HOẶC GIẢI MÃ TRỰC TIẾP ===
// Uncomment để test giải mã
/*
const encryptedHex = "2c1a9d0fb0d4d29e95dd4839606e23f444fe5cde43258d2d41d5bc22f3062827c939b340f71441c7dfb92f3f283e8e7fb3e7c974cfc482a586e0aa4bef76bb180efe454f3afd1fc35d6c951113fbce29bab4830a0fd6356291dc43ae4a8de187cd413ddc733bc7c65092440fda3187d113d4f8e5224c032ad486989d29f9ab68abd2e534215ef878be478449e7358939a42dc639f4f2fd014d14e95e804c36b2";
decryptPaymentLink(encryptedHex);
*/

// === EXPORT ĐỂ SỬ DỤNG Ở NƠI KHÁC ===
module.exports = {
    createPaymentLink,
    decryptPaymentLink,
    createMerchantToken,
    getLinkExptime
};
//  Một vài lưu ý quan trọng:
// Cài đặt dependencies:
// bashnpm install axios
// # crypto là built-in module của Node.js, không cần cài
// Những điểm khác biệt chính:

// HTTP Request: Dùng axios thay vì HttpURLConnection (gọn và dễ dùng hơn)
// Crypto: Node.js có module crypto built-in, tương đương DigestUtils và Cipher của Java
// Async/Await: JavaScript dùng async/await cho các tác vụ bất đồng bộ
// 3DES Decryption: Dùng des-ede3 mode giống như DESede/ECB/PKCS5Padding của Java

// Sử dụng:
// javascript// Tạo payment link
// const result = await createPaymentLink();

// // Giải mã response
// const decrypted = decryptPaymentLink(encryptedHexString);