import React from "react";
import { Container, Row, Col } from "react-bootstrap";
const HandlingInstall = () => {
  return (
    // <div className="flex min-h-screen">
      <Container className="py-4">
        <Row>
          <Col>
            
          <section className="mt-4">
            <p className="lead">Cập nhật lần cuối: {new Date().toLocaleDateString()}</p>
						<p>Để cài đặt phần mền, bạn cần mua phần mền trên website thanhtruckb.com, quý khách vui lòng làm theo hướng dẫn dưới đây:</p>
            <p><strong>Bước 1: </strong>Click chuột vào avata, chọn <strong>Orders</strong>. Trang web sẽ dẫn bạn tới trang quản lý đơn hàng của bạn.</p>
            <img
                src="/huong-dan-installS1.png"
                className="img-fluid rounded mx-auto d-block"
                alt="huong-dan-installS1"
              />
            <p>&nbsp;</p>
            <p><strong>Bước 2: </strong>Tại trang quản lý đơn hàng, chọn vào một đơn hàng đã thanh toán của bạn. Click vào nút <strong>Tải xuống</strong>. 
            Trang web sẽ tự động tải xuống File Source Code</p>
            <img
                src="/helpDownloadProductS3.png"
                className="img-fluid rounded mx-auto d-block"
                alt="huong-dan-installS1"
              />
             <p>&nbsp;</p>
             <p><strong>Bước 3: </strong> Triển khai Source Code của bạn.</p>
            </section>
            <p>&nbsp;</p>
            <section>
              <strong>QUY TRÌNH Cài đặt MÃ NGUỒN UNITY</strong> 
                <p>* Yêu cầu: Cài đặt Unity + Unity Hub. Cài phiên bản Unity đúng version mà dự án yêu cầu (thường ghi trong README hoặc ProjectSettings/ProjectVersion.txt).</p>
              <p> <strong> <em> Step 1</em> </strong>: Mở dự án trong Unity Hub.</p>
              <p>Lần đầu mở có thể mất vài phút để import asset và compile script.</p>
              <p><strong> <em>Step 2</em></strong> : Kiểm tra lỗi trong Console.</p>
              <ul>
                <li>Mở tab Console (Window → General → Console)</li>
                <li>Nếu có lỗi, bạn cần:</li>
                  <ul>
                    <li>Cài thêm package (Unity sẽ tự gợi ý)</li>
                    <li>Chỉnh sửa file (nếu version Unity không tương thích hoàn toàn)</li>
                  </ul> 
              </ul>
              <p><strong> <em>Step 3</em></strong> : Chạy dự án.</p>
              <ul>
                <li>Vào <strong>File</strong>  chọn <strong>Build Settings </strong> </li>
                <li>Chọn <strong> Scenes In Build </strong>và đảm bảo scene chính (main scene) đang được tick</li>
                <li>Đóng Build Settings</li>
                <li>Nhấn nút Play ▶️ ở thanh trên</li>
              </ul>
              <p><strong> <em>Step 4</em></strong> : Cài các SDK bên ngoài.</p>
              <p>Một số mã nguồn yêu cầu:</p>
              <ul>
                <li>Firebase, Facebook SDK, In-App Purchase, Ads</li>
                <li>Unity sẽ hiển thị lỗi thiếu thư viện nếu có</li>
              </ul>
              <p>Bạn cần đọc kỹ file README.md hoặc Documentation.pdf đi kèm để biết cần cài gì.</p>
              <p><strong> <em>Step 5</em></strong> :Build ra thiết bị thật (Android/iOS).</p>
              <p><strong>Android:</strong></p>
              <ul>
                <li>Vào File {'>'} Build Settings {'>'} Android</li>
                <li>Cài Android SDK (qua Unity Hub hoặc Android Studio)</li>
                <li>Click Build and Run</li>
              </ul>
              <p><strong>iOS:</strong></p>
              <ul>
                <li>Chỉ chạy được trên macOS + Xcode</li>
                <li>Chọn iOS trong Build Settings → Build → mở bằng Xcode</li>
              </ul>
            </section>
            <p>&nbsp;</p>
            <section>
            <strong>QUY TRÌNH CÀI ĐẶT DỰ ÁN React + Node.js</strong> 
                <p>* Yêu cầu: Cài đặt Node.js + nếu project dùng Yarn. Cài phiên bản Node.js đúng version mà dự án yêu cầu (thường ghi trong README hoặc ProjectSettings/ProjectVersion.txt).</p>
              <p> <strong> <em> Step 1</em> </strong>: Cài đặt Frontend (React.js).</p>
              <p>Lần đầu mở có thể mất vài phút để import asset và compile script.</p>
              <p>Mở terminal chạy lệnh sau</p>
              <ul>
                <li>cd client</li>
                <li>npm install </li>
                <li>npm start </li>
              </ul>
              <p>Ứng dụng React thường chạy ở: http://localhost:3000</p>
              <p><strong> <em>Step 2</em></strong> :Cài đặt Backend (Node.js).</p>
              <p>Mở terminal chạy lệnh sau</p>
              <ul>
                <li>cd server</li>
                <li>npm install</li>
              </ul>
              <p>Kiểm tra file cấu hình config.js, .env, hoặc config/default.json.</p><p>ví dụ:</p>
              <ul>
                <li>PORT=5000</li>
                <li>DB_URL=mongodb://localhost/mydb</li>
                <li>JWT_SECRET=abc123</li>
              </ul> 
              <p>⚠️ Nếu có .env.example, bạn cần copy: <strong>cp .env.example .env</strong></p>
              <p>Chạy server:</p>
              <ul>
                <li>npm start</li>
                <li>Hoặc: node index.js / server.js</li>
              </ul>
              <p><strong> <em>Step 3</em></strong> :KẾT NỐI FRONTEND ⇄ BACKEND.</p>
              <p><strong>"proxy"</strong>: http://localhost:5000</p>
              <p>{'=>'} Khi gọi fetch('/api/...'), React sẽ proxy qua backend ở port 5000.</p>
              <p><strong> <em>Step 4</em></strong> :KIỂM TRA SAU KHI CHẠY.</p>
              <ul>
                <li>Truy cập: http://localhost:3000 → UI có hiển thị không?</li>
                <li>Mở Developer Console → kiểm tra API có lỗi không</li>
                <li>Kiểm tra Terminal có lỗi nào không (frontend/backend)</li>
              </ul>
            </section>
            <p>&nbsp;</p>
            <section>
              <strong>QUY TRÌNH cài đặt MÃ NGUỒN PHP</strong>
              <p><strong>Bước 1: </strong>CÀI ĐẶT MÔI TRƯỜNG (XAMPP)</p>
              <ul>
                <li>Tải và cài XAMPP: https://www.apachefriends.org</li>
                <li>Nó bao gồm: Apache + PHP + MySQL</li>
              </ul>
              <p>Sau khi cài, bật Apache và MySQL từ XAMPP Control Panel.</p>
              <p><strong>Bước 2: </strong>COPY MÃ NGUỒN VÀO (htdocs)</p>
              <p>Mở thư mục cài đặt XAMPP, ví dụ: <strong>C:\xampp\htdocs</strong></p>
              <p>Giải nén mã nguồn mua về → đặt vào thư mục con, ví dụ: <strong>C:\xampp\htdocs\myproject</strong> </p>
              <p><strong>Bước 3:</strong>TRUY CẬP QUA TRÌNH DUYỆT: http://localhost/myproject/ </p>
              <ul>
                <li>Nếu có file index.php thì nó sẽ tự chạy.</li>
                <li>Nếu là Laravel hoặc framework, có thể cần thêm lệnh bên dưới (→ xem Bước 5).</li>
              </ul>
              <p><strong>Bước 4: </strong>TẠO DATABASE (NẾU CÓ)</p>
              <ul>
                <li>Truy cập: http://localhost/phpmyadmin/</li>
                <li>Tạo database với đúng tên được yêu cầu trong file cấu hình (thường là .env, config.php, database.php, hoặc tương tự).</li>
                <li>Import file .sql nếu mã nguồn có cung cấp (thường nằm trong thư mục database/, sql/, db/, hoặc assets/)</li>
              </ul>
              <p><strong>Bước 5:</strong>KIỂM TRA FILE CẤU HÌNH</p>
              <img
                src="/cai-php.png"
                className="img-fluid rounded mx-auto d-block"
                alt="KIỂM TRA FILE CẤU HÌNH php"
              />
              <p>Laravel thường chạy bằng: <strong>php artisan serve</strong> </p>
              <p>→ Truy cập tại: http://127.0.0.1:8000</p>
            </section>
            <p>&nbsp;</p>
            <section>
              <strong>QUY TRÌNH CHẠY LOCAL DỰ ÁN PYTHON</strong>
            <p><strong>Bước 1: </strong>CÀI ĐẶT PYTHON VÀ MÔI TRƯỜNG</p>
            <ul>
              <li>Cài Python</li>
              <li>Cài đặt Virtual Environment</li>
              <li>Kích hoạt môi trường ảo</li>
              <li>Cài đặt thư viện yêu cầu: <strong>pip install -r requirements.txt</strong></li>
            </ul>
            <p><strong>Bước 2:</strong>CẤU HÌNH DỰ ÁN (NẾU CẦN)</p>
            <ul>
              <li>Kiểm tra cấu hình: Xem các file cấu hình như config.py, .env, hoặc settings.py để biết các thông tin như database, API keys, hoặc cổng kết nối.</li>
              <li>Tạo database (nếu có):oNếu dự án yêu cầu database, bạn cần tạo và import schema (nếu có).</li>
            </ul>
            <p><strong>Bước 3:</strong>CHẠY DỰ ÁN</p>
            <p>✅ Loại 1: Ứng dụng Web (Flask, Django)</p>
            <ul>
              <li>Flask: <strong>python app.py</strong></li>
              <li>Django: <strong>python manage.py runserver</strong> </li>
              <li>Thường chạy tại http://127.0.0.1:8000 (Django) hoặc http://localhost:5000 (Flask).</li>
            </ul>
            <p>✅ Loại 2: Ứng dụng Console (Script Python)</p>
            <li>Chạy script đơn giản: <strong>python script.py</strong></li>
            <ul></ul>
            <p>✅ Loại 3: Ứng dụng GUI (Tkinter, PyQt, wxPython)</p>
            <ul>
              <li>Chạy ứng dụng GUI bằng lệnh: <strong>python main.py</strong></li>
            </ul>
            <p><strong>Bước 4:</strong> KIỂM TRA LỖI</p>
            <ul>
              <li>Nếu gặp lỗi, kiểm tra các thông báo trong console và đảm bảo các thư viện đã được cài đặt đầy đủ.</li>
              <li>Kiểm tra file requirements.txt, hoặc tài liệu đi kèm để cài đúng các thư viện cần thiết.</li>
            </ul>
            </section>
            <section>
             <p> Nếu có bất kì thắc mắc hay cần hỗ trợ trực tiếp bạn có thể liên hệ với chúng tôi qua </p>
             <ul>
              <li>Hostline:  0949942222 </li>
              <li>Mail: thanhtruckinhbac@gmail.com</li>
              <li>Facebook: <a href="https://www.facebook.com/profile.php?id=100016006836122">Nhân viên chăm sóc khách hàng</a> </li>
             </ul>
            </section>
          </Col>
        </Row>
      </Container>

      // {/* <Sidebar />
      // <Content /> */}
 
  );
};

export default HandlingInstall;
