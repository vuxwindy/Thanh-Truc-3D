import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const PaymentMethods = () => {
  return (
    <Container className="py-4">
      <Row>
        <Col>
          {/* Add more sections as needed */}

          <section className="mt-4">
            <h1 class="entry-title mb uppercase">Phương thức thanh toán</h1>
            <p className="lead">
            Cập nhật lần cuối: {new Date().toLocaleDateString()}
            </p>

             
              <p>
              Hiện nay, khi mua sản phẩm trực tuyến trên website
https://thanhtruckb.com/, khách hàng có thể chọn thực hiện thanh toán theo
những cách sau:
              </p>
              <p>
                <strong>
                Chuyển khoản ngân hàng
                  <br />
                </strong>
                <br />
                Khách hàng chuyển tiền vào tài khoản ngân hàng của chúng tôi dưới đây:
              </p>
              <p>
              Tên tài khoản:&nbsp;
                <strong>CÔNG TY TNHH THÀNH TRÚC KINH BẮC</strong>
              </p>
              <p>
              Số tài khoản:&nbsp;<strong>9683666666</strong>
              </p>
              <p>
                <strong>Ngân hàng thương mại cổ phần Quân đội (MBBank)</strong>
              </p>
              <p>
              * Lưu ý: Trước khi đặt hàng và thanh toán bằng chuyển khoản, vui lòng
kiểm tra kỹ thông tin về sản phẩm đã đặt hàng
(loại sản phẩm, hình ảnh mô tả, thông tin giới thiệu…)
cùng số tiền cần thanh toán được hiển thị rõ ràng trong thông tin đơn hàng
trên giao diện website thanhtruckb.com.
              </p>
              <p>
              * Lưu ý: Cần liên hệ với đội ngũ hỗi trợ khách hàng của thanhtruckb.com trước khi thực hiện thanh toán bằng chuyển khoản. 
              </p>
     
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentMethods;
