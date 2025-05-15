import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const InspectionPolicy = () => {
  return (
    <Container className="py-4">
      <Row>
        <Col>
          {/* Add more sections as needed */}

          <section className="mt-4">
            <h1 class="entry-title mb uppercase">Chính sách kiểm tra</h1>
            <p className="lead">
            Cập nhật lần cuối: {new Date().toLocaleDateString()}
            </p>

          
              <p>
              Để bảo vệ quyền lợi của khách hàng khi mua sắm trên
thanhtruckb.com, chúng tôi có chính sách hỗ trợ khách hàng kiểm tra
khi nhận hàng. Tức là khi bạn nhận được đường link từ email,
bạn được phép cài đặt và kiểm tra trực tiếp.
              </p>
              &nbsp;
              <h2>
              <strong>Các thông tin liên hệ với Lucentis Shop</strong>
            </h2>
            <p>
              Khách hàng có thể liên hệ với Công ty TNHH Lucentis  
              theo các cách sau:
            </p>
            <p>*Cách 1: Gọi đến số hotline của chúng tôi: 0949942222</p>
            <p>
              * Cách 2: Gửi email đến địa chỉ:&nbsp;
              <a href="mailto:thanhtruckinhbac@gmail.com">
                thanhtruckinhbac@gmail.com
              </a>
            </p>
            <p>
              * Cách 3: Đến trực tiếp địa chỉ: Khu phố Đỗ Nha, Phường Phương
              Liễu, Thị xã Quế Võ, Tỉnh Bắc Ninh.
            </p>
            <p>
              Công ty TNHH Lucentis   sẽ phản hồi kết quả xử lý khiếu
              nại cho Khách hàng trong vòng 03 ngày làm việc kể từ ngày hoàn tất
              xác minh thông tin và xử lý.
            </p>
            <p>
              Công ty TNHH Lucentis   sẽ cố gắng xác minh thông tin và
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

export default InspectionPolicy;
