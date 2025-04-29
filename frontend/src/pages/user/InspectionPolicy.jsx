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
              <p>
                <em>*</em> Để biết thêm thông tin chi tiết, vui lòng liên hệ với chúng tôi qua đường dây nóng:
                0949942222.
              </p>
 
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default InspectionPolicy;
