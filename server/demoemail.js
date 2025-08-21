require('dotenv').config(); // nếu bạn dùng file .env
const { sendProductLicensesEmail } = require('./config/email');

// Gửi email demo
(async () => {
  const demoEmail = 'lucentiscompany@gmail.com'; // Thay = email real để test
  const orderId = 1001;
  const demoProducts = [
    {
      name: 'Bản quyền Photoshop Pro',
      licence: 'PSP-2024-XYZ',
      link: 'https://yourshop.com/product/photoshop-pro',
      zip: 'https://yourshop.com/files/photoshop-pro.zip'
    },
    {
      name: 'Bản quyền AI Generator',
      licence: 'AIG-888-BETA',
      link: 'https://yourshop.com/product/ai-generator',
      zip: 'https://yourshop.com/files/ai-generator.zip'
    }
  ];

  try {
    await sendProductLicensesEmail(demoEmail, orderId, demoProducts);
    console.log('✅ Đã gửi email demo thành công!');
  } catch (err) {
    console.error('❌ Lỗi khi gửi email demo:', err);
  }
})();
