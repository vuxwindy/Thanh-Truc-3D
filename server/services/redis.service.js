const redis = require('../config/redis');

const VERIFICATION_CODE_EXPIRY = 600; // 10 minutes in seconds

const saveVerificationCode = async (email, code) => {
  const key = `${email}_${code}`;
  await redis.setex(key, VERIFICATION_CODE_EXPIRY, '1');
};

const verifyCode = async (email, code) => {
  const key = `${email}_${code}`;
  const exists = await redis.exists(key);
  if (exists) {
    await redis.del(key);
    return true;
  }
  return false;
};

module.exports = {
  saveVerificationCode,
  verifyCode,
}; 