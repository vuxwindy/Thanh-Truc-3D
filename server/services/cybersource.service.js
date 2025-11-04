
import axios from 'axios';
import crypto from 'crypto';

async function paymentVnPt(amount, currency, transaction) {
    const url = 'https://pg.megapay.vn/pg_was/createlink.do'; // ⚠️ thay bằng URL thật
    const merId = 'LUCENTIS01';
    const invoiceNo = 'INV-' + Date.now();

    const encodeKey = 'jmjrqmszeVz5+TQy0RHfrj9OZLXeaf/nkdCJItM+pyt6li0S4z+TnRm/S+Bb46MJ99+iXARV0zExmLpFNRRsYQ==';
    const timeStamp = Date.now().toString();
    const linkExptime = getLinkExptime();
    const merchantToken = createMerchantToken(timeStamp, invoiceNo, merId, amount, linkExptime, encodeKey);
    const signature = sha256(invoiceNo + amount + encodeKey);

     const payload = {
    merId,
    currency: 'VND', // thanh đổi ở đây để đơn vị tiền tệ
    amount,
    invoiceNo,
    goodsNm: 'San pham test',
    payType: 'NO',
    buyerFirstNm: 'Tuan',
    buyerLastNm: 'Phung',
    buyerEmail: 'tuanphungdinh2002@gmail.com',
    callBackUrl: 'lucentis.it.com/payment-confirmation',
    notiUrl: 'test.com.vn',
    reqDomain: 'lucentis.it.com',
    descriptions: 'test mua hang',
    merchantToken,
    userLanguage: 'VN',
    timeStamp,
    windowColor: '#ef5459',
    hash: signature,
    linkExptime
  };

  console.log('Sending:', JSON.stringify(payload, null, 2));

  try {
    const response = await axios.post(url, payload, {
      headers: { 'Content-Type': 'application/json' }
    });
    return decrypt3DES(response.data.paymentLink, encodeKey);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}   

function sha256(str) {
  return crypto.createHash('sha256').update(str, 'utf8').digest('hex');
}

function createMerchantToken(timeStamp, invoiceNo, merId, amount, linkExptime, encodeKey) {
  const merchantStructure = timeStamp + invoiceNo + merId + amount + linkExptime + encodeKey;
  const hash = sha256(merchantStructure);
  console.log('Merchant Token:', hash);
  return hash;
}

function getLinkExptime() {
  const now = new Date();
  now.setHours(now.getHours() + 24); // thời gian hết hạn link thanh toán
  const yyyy = now.getFullYear();
  const MM = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const HH = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  return `${yyyy}${MM}${dd}${HH}${mm}${ss}`;
}


function hexToBytes(hex) {
  const bytes = [];
  for (let c = 0; c < hex.length; c += 2) {
    bytes.push(parseInt(hex.substr(c, 2), 16));
  }
  return Buffer.from(bytes);
}

function decrypt3DES(encryptedHex, encodeKey) {
  // Lấy 24 ký tự đầu của key
  const key24 = encodeKey.substring(0, 24);
  const keyBuffer = Buffer.from(key24, "utf8");

  // Chuyển hex sang bytes
  const encryptedBytes = hexToBytes(encryptedHex);

  // Tạo cipher DESede/ECB/PKCS5Padding
  const decipher = crypto.createDecipheriv("des-ede3", keyBuffer, null);
  decipher.setAutoPadding(true);

  let decrypted = decipher.update(encryptedBytes, undefined, "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
export { paymentVnPt };

