import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const WarrantyPolicy = () => {
  return (
    <Container className="py-4">
      <Row>
        <Col>
          {/* Add more sections as needed */}

          <section className="mt-4">
            <h1 class="entry-title mb uppercase"> Chính sách bảo hành</h1>
            <p className="lead">
            Cập nhật lần cuối: {new Date().toLocaleDateString()}
            </p>
           
            <ol>
                <li >
                  <strong>Được bảo hành:</strong>
                </li>
              </ol>
               <p>
                – Sản phẩm vừa được giao không giống như hình ảnh,
                mô tả được cung cấp hoặc trên trang web.
              </p>
              <ol start="2">
                <li >
                  <strong>Những trường hợp không được bảo hành:</strong>
                </li>
              </ol>
              <p>– Sản phẩm bị lỗi do lắp đặt không đúng cách</p>
              <p>– Sản phẩm đã được sửa đổi, mã đã được thay đổi</p>
              <ol start="3">
                <li >
                  <strong>
                  Quy trình, phương pháp bảo hành và điểm liên hệ
                  </strong>
                </li>
              </ol>
              <p>
                <strong>
                Chúng tôi khuyến khích bạn gửi trực tiếp đến
trụ sở công ty theo địa chỉ: Khu phố Đỗ Nha, Phường Phương Liễu,
Thị xã Quế Võ, Tỉnh Bắc Ninh, Việt Nam để được hỗ trợ bảo hành
trong thời gian nhanh nhất.
                </strong>
              </p>
              <p>
                <strong>
                Trong trường hợp bạn gửi hàng đến thanhtruckb.com, thời hạn bảo hành dự kiến ​​là trong vòng 3-5 ngày kể từ ngày thanhtruckb.com nhận được hàng. Thời hạn bảo hành cụ thể
                tùy thuộc vào lỗi sản phẩm trong từng trường hợp.
                </strong>
              </p>
              <p>
                <strong>
                  Để trả lời các câu hỏi hoặc hướng dẫn chi tiết về
                  https://thanhtruckb.com/ , quy trình bảo hành sản phẩm, vui lòng
                  liên hệ số điện thoại 0949942222 hoặc email:
                  thanhtruckinhbac@gmail.com
                </strong>
              </p>  
    
 
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default WarrantyPolicy;
