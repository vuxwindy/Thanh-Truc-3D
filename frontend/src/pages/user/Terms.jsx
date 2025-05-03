import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Terms = () => {
  return (
    <Container className="py-4">
      <Row>
        <Col>
          {/* Add more sections as needed */}
          
          <section className="mt-4">
					  <h1 class="entry-title mb uppercase">Hướng dẫn mua hàng</h1>
            <p className="lead">Cập nhật lần cuối: {new Date().toLocaleDateString()}</p>
						<p>Để mua hàng trên website thanhtruckb.com, quý khách vui lòng làm theo hướng dẫn dưới đây:</p>
            <p><strong>Bước 1: </strong>Chọn danh mục Trò chơi bạn muốn.</p>
            <img
                src="/BuyingGuideS1.png"
                className="img-fluid rounded mx-auto d-block"
                alt="BuyingGuideS1"
              />
            <p>&nbsp;</p>
            <p><strong>Bước 2: </strong>Hệ thống di chuyển đến trang danh sách trò chơi bạn đã chọn.&nbsp;
            Tiếp theo, Nhấp vào sản phẩm để xem chi tiết sản phẩm.</p>
            <img
                src="/BuyingGuideS2.png"
                className="img-fluid rounded mx-auto d-block"
                alt="BuyingGuideS2"
              />
            <p>&nbsp;</p>
            <p><strong>Bước 3:</strong> Thông tin sản phẩm sẽ xuất hiện. &nbsp;Tiếp theo, Thêm sản phẩm vào giỏ hàng của bạn.</p>
            <img
                src="/BuyingGuideS3.png"
                 className="img-fluid rounded mx-auto d-block"
                alt="BuyingGuideS3"
              />
              <p>Sẽ có thông báo sản phẩm bổ sung vào giỏ hàng thành công.</p>
               <p>&nbsp;</p>
            <p><strong>Bước 4:</strong> Bạn cần phải truy cập trang giỏ hàng qua <strong>Icon Cart</strong>.</p>
            <p>Sau đó chọn<strong>Proceed to checkout</strong>  để chọn phương thức thanh toán.</p>
            <img
                src="/BGS6.png"
                 className="img-fluid rounded mx-auto d-block"
                alt="BuyingGuideS3"
              />
              <p>&nbsp;</p>
              <p>Hệ thống sẽ chuyển bạn đến trang thanh toán.</p>
            <p><strong>Bước 5:</strong> Bạn có thể xem thông tin sản phẩm và chọn phương thức thanh toán tại đây.</p>
            <p> Nếu bạn chọn thanh toán bằng thẻ thanh toán, hãy chọn<strong>The Debit or Credit</strong>.</p>
            <p>Nếu bạn chọn thanh toán qua Paypal, hãy chọn<strong>Paypal</strong>.</p>
            <img
                src="/BGS2.png"
                 className="img-fluid rounded mx-auto d-block"
                alt="BuyingGuideS3"
              />
                <p>&nbsp;</p>
           
            <p><strong>The Debit or Credit </strong>  Sau khi hoàn tất thông tin thẻ, chọn thanh toán để hoàn tất giao dịch mua. </p>
            <p> Sau đó nhập thông tin</p>
            <img
                src="/BGS3.png"
                 className="img-fluid rounded mx-auto d-block"
                alt="BuyingGuideS3"
              />
              
                <p>&nbsp;</p>
            <p><strong>Bước 6:</strong>  Bạn sẽ có thể nhập thông báo mua hàng thành công.</p>
            <p>Màn hình hiển thị đơn hàng thành công</p>
            <img
                src="/BGS4.png"
                 className="img-fluid rounded mx-auto d-block"
                alt="BuyingGuideS3"
              />
                <p>&nbsp;</p>
            <p><strong>Bước 7:</strong> Bây giờ bạn có thể kiểm tra email của mình để nhận liên kết sản phẩm.</p>
            <img
                src="/emailProduct.png"
                 className="img-fluid rounded mx-auto d-block"
                alt="Email Product "
              />
                <p>&nbsp;</p>
            
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default Terms;