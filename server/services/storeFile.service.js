const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const SOURCE_DIR = "storeFile";
const RAW_DIR = "files/raw";
const META_DIR = "files/meta";

// Tạo thư mục nếu chưa có
fs.mkdirSync(RAW_DIR, { recursive: true });
fs.mkdirSync(META_DIR, { recursive: true });

// Hàm chuyển base64 → base64url
function toBase64URL(base64) {
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

// Lấy danh sách file .zip trong thư mục storeFile
const zipFiles = fs.readdirSync(SOURCE_DIR).filter(file => file.endsWith(".zip"));

if (zipFiles.length === 0) {
  console.error("⚠️  Không tìm thấy file .zip nào trong thư mục storeFile.");
  process.exit(1);
}

// Mỗi .zip được đọc → tính hash → đổi tên → lưu trữ (nếu chưa có).
// Không file nào bị trùng.
zipFiles.forEach(fileName => {
  const filePath = path.join(SOURCE_DIR, fileName);
  const fileBuffer = fs.readFileSync(filePath);
  
  const base64Hash = crypto.createHash("sha256").update(fileBuffer).digest("base64");
  const hash = toBase64URL(base64Hash);

  const rawPath = path.join(RAW_DIR, `${hash}.zip`);
  if (!fs.existsSync(rawPath)) {
    fs.writeFileSync(rawPath, fileBuffer);
  }

  const meta = {
    hash,
    original_name: fileName,
    path: path.resolve(rawPath),
    created_at: new Date().toISOString(),
    expired_at: new Date(Date.now() + 60 * 60 * 1000).toISOString()
  };

  fs.writeFileSync(path.join(META_DIR, `${hash}.json`), JSON.stringify(meta, null, 2));
  console.log(`✅ Đã lưu file ${fileName} với hash: ${hash}`);
});
