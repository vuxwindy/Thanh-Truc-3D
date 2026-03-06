import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const RefundPolicy = () => {
  return (
    <Container className="py-4 py-md-5">
      <Row className="justify-content-center">
        <Col lg={10} xl={8}>
          <div className="bg-dark text-light p-4 p-md-5 rounded shadow-sm" style={{ border: '1px solid #333' }}>
            <h1 className="text-center mb-4 text-primary" style={{ fontWeight: 'bold' }}>
              CHÍNH SÁCH ĐỔI TRẢ & HOÀN TIỀN LUCENTIS<br />
              <span className="fs-4 text-secondary">(Refund & Return Policy)</span>
            </h1>

            <p className="lead border-bottom border-secondary pb-3 mb-4">
              Khi thực hiện thanh toán trên website này, khách hàng xác nhận rằng đã đọc, hiểu và đồng ý với toàn bộ Chính sách Đổi trả & Hoàn tiền dưới đây.
            </p>

            <section className="mb-4">
              <h4 className="text-info fw-bold mb-3">1. NGUYÊN TẮC CHUNG</h4>
              <p>Tất cả các sản phẩm/dịch vụ được bán trên website đều được cung cấp theo nguyên tắc <strong>“Bán đứt – Không hoàn tiền” (All Sales Are Final)</strong>.</p>
              <p>Sau khi đơn hàng được thanh toán thành công, giao dịch được xem là hoàn tất và không thể hủy bỏ.</p>
              <p>Chúng tôi không chấp nhận yêu cầu hoàn tiền, hủy đơn hoặc trả hàng với bất kỳ lý do nào, bao gồm nhưng không giới hạn:</p>
              <ul className="text-secondary" style={{ listStyleType: "disc", paddingLeft: "1.5rem" }}>
                <li>Khách hàng thay đổi ý định mua hàng</li>
                <li>Khách hàng nhập sai thông tin</li>
                <li>Khách hàng không còn nhu cầu sử dụng</li>
                <li>Khách hàng không đọc kỹ mô tả sản phẩm</li>
                <li>Khách hàng không hiểu rõ điều khoản trước khi thanh toán</li>
              </ul>
            </section>

            <section className="mb-4">
              <h4 className="text-info fw-bold mb-3">2. KHÔNG ÁP DỤNG HOÀN TIỀN</h4>
              <p>Chúng tôi không xử lý hoàn tiền trong các trường hợp sau:</p>
              <ul className="text-secondary" style={{ listStyleType: "disc", paddingLeft: "1.5rem" }}>
                <li>Khách hàng đã hoàn tất thanh toán trên website</li>
                <li>Đơn hàng đã được xử lý hoặc đang trong quá trình xử lý</li>
                <li>Khách hàng không hài lòng với sản phẩm sau khi mua</li>
                <li>Khách hàng yêu cầu hoàn tiền thông qua ngân hàng hoặc cổng thanh toán</li>
                <li>Khách hàng cho rằng không nhận được hàng nhưng thông tin giao hàng đã được hệ thống ghi nhận</li>
              </ul>
            </section>

            <section className="mb-4">
              <h4 className="text-info fw-bold mb-3">3. TRÁCH NHIỆM CỦA KHÁCH HÀNG</h4>
              <p>Khách hàng có trách nhiệm:</p>
              <ul className="text-secondary" style={{ listStyleType: "disc", paddingLeft: "1.5rem" }}>
                <li>Kiểm tra đầy đủ thông tin đơn hàng trước khi thanh toán</li>
                <li>Đọc kỹ mô tả sản phẩm, điều khoản dịch vụ và chính sách hoàn tiền</li>
                <li>Cung cấp thông tin thanh toán và giao hàng chính xác</li>
              </ul>
              <p className="text-warning">Chúng tôi không chịu trách nhiệm đối với sai sót phát sinh từ phía khách hàng.</p>
            </section>

            <section className="mb-4">
              <h4 className="text-info fw-bold mb-3">4. TRANH CHẤP THANH TOÁN (CHARGEBACK)</h4>
              <p>Trong trường hợp khách hàng tự ý thực hiện tranh chấp thanh toán (chargeback) thông qua ngân hàng hoặc cổng thanh toán:</p>
              <ul className="text-secondary" style={{ listStyleType: "disc", paddingLeft: "1.5rem" }}>
                <li>Chúng tôi có quyền cung cấp toàn bộ bằng chứng giao dịch</li>
                <li>Bao gồm: lịch sử thanh toán, địa chỉ IP, email xác nhận, điều khoản sử dụng</li>
              </ul>
              <p className="text-danger fw-bold">Các giao dịch đã hoàn tất sẽ được xem là hợp lệ và có sự đồng ý của khách hàng.</p>
            </section>

            <section className="mb-0">
              <h4 className="text-info fw-bold mb-3">5. GIỚI HẠN TRÁCH NHIỆM</h4>
              <p className="mb-0 text-secondary">
                Website và đơn vị vận hành không chịu trách nhiệm đối với các thiệt hại trực tiếp hoặc gián tiếp phát sinh từ việc sử dụng sản phẩm hoặc dịch vụ được mua trên website.
              </p>
            </section>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RefundPolicy;
