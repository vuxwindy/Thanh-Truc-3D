import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

const officeImages = [
  { src: "/sanhvanphong.jpg", title: "Khu vực sảnh" },
  { src: "/khonggianchung.jpg", title: "Khu vực không gian chung" },
  { src: "/anninhmang.jpg", title: "Phòng  an ninh mạng" },
  { src: "/nhan-vien.jpg", title: "Phòng bán hàng & CSKH" },
  { src: "/cskh.jpg", title: "Bộ phận kỹ thuật chuyên môn" },
  { src: "/anhPhongHop.jpg", title: "Không gian phòng họp" },
];

const AboutThanhTruc = () => {
  return (
    <Container className="py-4">
      <Row>
        <Col>
          {/* Add more sections as needed */}

          <section className="mt-4">
            <h1 class="entry-title mb uppercase">Giới thiệu về Lucentis</h1>
            <p>
              <em>Chuyên bán các sản phẩm về Phần mềm ứng dụng đa dạng các lĩnh vực</em>
            </p>
            <strong class="font-bold">
              Lucentis Shop có mục tiêu đơn giản như sau:
            </strong>
            <ul>
              <li>Tốc đô nhanh</li>
              <li>Bỏa hành - Uy tín</li>
              <li>Chất lượng dịch vụ</li>
            </ul>
            <p>&nbsp;</p>
            <h2>Văn phòng hoạt động của Lucentis</h2>
            <Row>
              {officeImages.map((img, idx) => (
                <Col
                  key={idx}
                  xs={12}
                  sm={6}
                  md={4}
                  className="mb-4 text-center"
                >
                  <Image
                    src={img.src}
                    alt={img.title}
                    fluid
                    rounded
                    className="shadow-sm"
                  />
                  <p className="mt-2">{img.title}</p>
                </Col>
              ))}
            </Row>
            <p>&nbsp;</p>
            <h2>
              <strong>Vì sao các khách hàng thường chọn Lucentis?</strong>
            </h2>
            &nbsp;
            <h3>
              <strong>1. Những năm hoạt động Uy tín </strong>
            </h3>
            <p>
              Lucentis Shop là một tên tuổi mới trong tại thị trường quốc tế,
              được khẳng định thông qua hơn 1 triệu khách hàng.
            </p>
            <ul>
              <li>Do chính cộng đồng bình chọn.</li>
              <li>
                Đã có hơn 1 Triệu khách hàng đặt hàng trong suốt 3 năm hoạt
                động. &nbsp; Hàng tháng website Lucentis chào đón hơn 400.000
                lượt truy cập mua hàng.
              </li>
              <li>
                Được các Kols, Streamer hàng đầu lựa chọn và quảng bá trên nhiều
                quốc gia
              </li>
            </ul>
            <h3>
              <strong>2. Sản phẩm đa dạng</strong>{" "}
            </h3>
            <p>
              Với hàng chục nghìn sản phẩm trên Website Lucentis chúng tôi tự
              tin mang đến cho bạn tất cả những gì bạn cần trong thế giới bản
              quyền.
            </p>
            <ul>
              <li>Các phần mềm tiện ích</li>
              <li>Các phần mềm giải trí đa dạng</li>
              <li>Các phần mềm học tập chất lượng</li>
            </ul>
            <h3>
              <strong>3. Hình thức thanh toán thuận tiện</strong>
            </h3>
            <p>Đa dạng hình thức thanh toán giúp khách hàng dễ dàng lựa chọn</p>
            <p>Hệ thống tự động giúp hoàn thành đơn hàng ngay lập tức</p>
            <p>
              * Mọi quy trình thanh toán đều được tự động cao giúp khách hàng có
              thể hoàn thành đơn hàng chỉ trong 1 giây - Ngay lập tức.
            </p>
            <h3>
              <strong>4. Chế độ bảo hành và hỗ trợ.</strong>
            </h3>
            <p>
              <strong>Cam kết bảo hành</strong>
            </p>
            <ul>
              <li>
                Thông tin bảo hành từng sản phẩm đều được ghi chi tiết theo từng
                loại sản phẩm.
              </li>
              <li>
                Trong suốt thời gian sử dụng sản phẩm. Bạn sẽ nhận được sự hỗ
                trợ từ đội ngũ tư vấn của chúng tôi hoàn toàn miễn phí.
              </li>
            </ul>
            <p>
              <strong>Hỗ trợ tất cả các ngày trong năm</strong>
            </p>
            <ul>
              <li>
                Chúng tôi Online liên tục từ 08:30 đến 23:00, tất cả các ngày
                trong năm kể cả lễ, Tết.
              </li>
              <li>
                Chúng tôi tự hào với thời gian phản hồi khách hàng trung bình là
                1 Phút.{" "}
              </li>
            </ul>
            <p>
              <strong>Đội ngũ tư vấn nhiều kinh nghiệm</strong>
            </p>
            <ul>
              <li>
                Đội ngũ tư vấn với nhiều năm kinh nghiệm sẽ giải đáp cho bạn tất
                cả các thắc mắc trong quá trình mua hàng và cài đặt sản phẩm.{" "}
              </li>
              <li>
                Với những trường hợp khó xử lý. Chúng tôi sẽ Teamview trực tiếp
                để cài đặt giúp bạn.{" "}
              </li>
            </ul>
            <h3>
              <strong>5. Giá cả và ưu đãi</strong>
            </h3>
            <p>
              Chúng tôi đem đến cho khách hàng những sản phẩm với giá cả tốt
              nhất cùng với đó là những ưu đãi vô cùng hấp dẫn. &nbsp;
            </p>
            <p>&nbsp;</p>
            <h2>
              <strong>Các thông tin liên hệ với Lucentis Shop</strong>
            </h2>
            <p>
              Khách hàng có thể liên hệ với CÔNG TY TNHH LUCENTIS  
              theo các cách sau:
            </p>
            <p>*Cách 1: Gọi đến số hotline của chúng tôi: 0332354286</p>
            <p>
              * Cách 2: Gửi email đến địa chỉ:&nbsp;
              <a href="mailto:lucentiscompany@gmail.com">
                lucentiscompany@gmail.com
              </a>
            </p>
            <p>
              * Cách 3: Đến trực tiếp địa chỉ: Khu phố Đỗ Nha, Phường Phương
              Liễu, Thị xã Quế Võ, Tỉnh Bắc Ninh.
            </p>
            <p>
              CÔNG TY TNHH LUCENTIS   sẽ phản hồi kết quả xử lý khiếu
              nại cho Khách hàng trong vòng 03 ngày làm việc kể từ ngày hoàn tất
              xác minh thông tin và xử lý.
            </p>
            <p>
              CÔNG TY TNHH LUCENTIS   sẽ cố gắng xác minh thông tin và
              giải quyết khiếu nại nhanh chóng, kịp thời để đảm bảo quyền lợi
              của Khách hàng. Trong trường hợp vượt quá khả năng và thẩm quyền
              của Trung tâm, chúng tôi sẽ yêu cầu Khách hàng đưa vụ việc này đến
              cơ quan nhà nước có thẩm quyền để giải quyết theo quy định của
              pháp luật.
            </p>
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutThanhTruc;
