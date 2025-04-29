import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const RefundPolicy = () => {
  return (
    <Container className="py-4">
      <Row>
        <Col>
          {/* Add more sections as needed */}

          <section className="mt-4">
            <h1 class="entry-title mb uppercase"> Chính sách hoàn trả và hoàn tiền </h1>
            <p className="lead">
            Cập nhật lần cuối: {new Date().toLocaleDateString()}
            </p>
              <ol>
                <li>
                  <strong>
                  Các trường hợp được chấp nhận trả lại (chỉ áp dụng cho sản phẩm vật lý)
                  </strong>
                </li>
              </ol>
              <p>
                – Sản phẩm bị lỗi do bộ phận thiết kế và kỹ thuật của http://thanhtruckb.com/
              </p>
              <ol start="2">
                <li>
                  <strong>Quy định về trả lại sản phẩm:</strong>
                </li>
              </ol>
              <p>
                – Thời gian để khách hàng liên hệ yêu cầu trả hàng hợp lệ là
                03 ngày làm việc kể từ thời điểm nhận được sản phẩm.
              </p>
              <p>
                – Cách thức trả hàng: Khách hàng cần thông báo cho nhân viên của
http://thanhtruckb.com/ qua số điện thoại 0949942222 về
lý do trả hàng, địa chỉ và số điện thoại liên lạc chính xác để
chúng tôi có thể thực hiện quy trình trả hàng nhanh nhất
có thể theo yêu cầu của quý khách. Chúng tôi sẽ yêu cầu khách hàng
cung cấp bằng chứng mua hàng (ảnh, video mở hộp) để
có cơ sở xử lý yêu cầu đổi/trả hàng của khách hàng.
              </p>
              <p>
              Đối với các yêu cầu trả hàng hợp lệ (khách hàng cung cấp đầy đủ thông tin
chứng minh đã mua sản phẩm trên trang web
http://thanhtruckb.com/ và đáp ứng thời hạn liên hệ trả hàng),
chúng tôi sẽ hỗ trợ khách hàng đổi sản phẩm mới.
              </p>
              <p>
              – Địa điểm đổi trả sản phẩm: http://thanhtruckb.com/ khuyến khích
khách hàng mang sản phẩm trực tiếp đến cửa hàng tại
địa chỉ: Khu phố Đỗ Nha, Phường Phương Liễu, Thị xã Quế Võ, Tỉnh Bắc Ninh
để chúng tôi kiểm tra sản phẩm và khách hàng có thể xem
và lựa chọn đổi sản phẩm theo nhu cầu của mình. Đối với
khách hàng ở tỉnh, bạn có thể gửi sản phẩm qua đường bưu điện và
liên hệ với Công ty về sản phẩm đổi trả, mã bưu chính… để
chúng tôi có thể xử lý và gửi trả sản phẩm sớm nhất có thể sau khi nhận được sản phẩm.
              </p>
              <ol start="3">
                <li>
                  <strong>Chính sách hoàn tiền</strong>
                </li>
              </ol>
              <p>
              Chúng tôi không hoàn lại tiền cho tất cả các sản phẩm công nghệ sau khi giao dịch thành công
. Tất cả các giao dịch mua đều là giao dịch cuối cùng và chúng tôi không cung cấp bất kỳ
đảm bảo hoàn lại tiền nào. Bạn đã đọc và đồng ý rằng bạn sẽ không được
hoàn lại tiền cho bất kỳ giao dịch mua nào trong bất kỳ trường hợp nào.
              </p>
        
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default RefundPolicy;
