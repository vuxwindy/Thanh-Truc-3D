import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const PaymentMethods = () => {
  return (
    <Container className="py-4 text-light">
      <Row>
        <Col>
          {/* Add more sections as needed */}

          <section className="mt-4">
            <h1 class="entry-title mb uppercase">Phương thức thanh toán</h1>
            <p className="lead">
            Cập nhật lần cuối: {new Date().toLocaleDateString()}
            </p>

             
              <p>
              Hiện nay, khi mua sản phẩm trực tuyến trên website <a href="https://lucentis.it.com">lucentis.it.com</a>
, khách hàng có thể chọn một phương thức thanh toán duy nhất là thực hiện thanh toán trực tiếp trên web site.
              </p>
             
              <p>
              * Lưu ý: Trước khi đặt hàng và thanh toán, vui lòng
kiểm tra kỹ thông tin về sản phẩm đã đặt hàng
(loại sản phẩm, hình ảnh mô tả, thông tin giới thiệu…)
cùng số tiền cần thanh toán được hiển thị rõ ràng trong thông tin đơn hàng
trên giao diện website <a href="https://lucentis.it.com">lucentis.it.com</a>.
              </p>
              <p>
              * Lưu ý: khi thanh toán là bạn đã đồng ý với các điều khoản mua hàng của bên tôi.
              </p>
              &nbsp;
              <h2>
              <strong>Các thông tin liên hệ với Lucentis </strong>
            </h2>
            <p>
              Khách hàng có thể liên hệ với CÔNG TY TNHH LUCENTIS  
              theo các cách sau:
            </p>
            {/* <p>* Cách 1: Gọi đến số hotline của chúng tôi: 0332354286</p>
            <p>
              * Cách 2: Gửi email đến địa chỉ:&nbsp;
              <a href="mailto:lucentiscompany@gmail.com">
                lucentiscompany@gmail.com
              </a>
            </p>
            <p>
              * Cách 3: Đến trực tiếp địa chỉ: Khu phố Đỗ Nha, Phường Phương
              Liễu, Tỉnh Bắc Ninh.
            </p> */}
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

export default PaymentMethods;
