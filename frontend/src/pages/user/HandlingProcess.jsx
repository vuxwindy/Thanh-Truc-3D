import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const HandlingProcess = () => {
  return (
    <Container className="py-4">
      <Row>
        <Col>
          {/* Add more sections as needed */}

          <section className="mt-4">
            <h1 class="entry-title mb uppercase"> Quy trình tiếp nhận và xử lý khiếu nại</h1>
            <p className="lead">
            Cập nhật lần cuối: {new Date().toLocaleDateString()}
            </p>
            
                  
            
              <p>
                <strong>Điều 1: Cơ chế giải quyết</strong>.
              </p>
              <p>
              Mọi khiếu nại của Khách hàng đều được giải quyết trên cơ sở
đàm phán. Trong trường hợp không đạt được thỏa thuận mong muốn,
một trong hai bên có quyền đưa vụ việc ra cơ quan Nhà nước có thẩm quyền
để giải quyết.
              </p>
              <p>
              Trong trường hợp xảy ra sự cố do lỗi của &nbsp;
                <u>thanhtruckb.com</u>, chúng tôi sẽ ngay lập tức áp dụng các biện pháp cần thiết để đảm bảo quyền lợi của khách hàng.
              </p>
              <p>
                <strong>Điều 2: Phương pháp nộp khiếu nại</strong>.
              </p>
              <p>
              Khách hàng có thể gửi khiếu nại yêu cầu Công ty TNHH Thanh Trúc Kinh Bắc giải quyết theo các cách sau:
              </p>
              <p>*Cách 1: Gọi đến số hotline của chúng tôi: 0949942222</p>
              <p>
                * Cách 2: Gửi email đến địa chỉ:&nbsp;
                <a href="mailto:thanhtruckinhbac@gmail.com">
                  thanhtruckinhbac@gmail.com
                </a>
              </p>
              <p>
                * Cách 3: Đến trực tiếp địa chỉ: Khu phố Đỗ Nha, Phường Phương Liễu, Thị xã Quế Võ, Tỉnh Bắc Ninh.
              </p>
              <p>
                <strong>Điều 3: Quy trình thực hiện</strong>.
              </p>
              <p>
              *  <em>Bước 1: </em>Gửi khiếu nại.
              </p>
              <p>
              Khách hàng gửi khiếu nại về các dịch vụ hoặc quyền lợi chưa được Công ty TNHH Thanh Trúc Kinh Bắc đảm bảo đầy đủ
              thông qua các phương thức nêu trên.
              </p>
              <p>
              *   <em>Bước 2: </em>Tiếp nhận và xử lý khiếu nại.
              </p>
              <p>
              Công ty TNHH Thanh Trúc Kinh Bắc sẽ tiếp nhận khiếu nại của
              Khách hàng và tiến hành xác minh thông tin.
              </p>
              <p>
              *  <em>Bước 3: </em>Trả lời khách hàng.
              </p>
              <p>
              Công ty TNHH Thanh Trúc Kinh Bắc sẽ phản hồi kết quả
xử lý khiếu nại cho Khách hàng trong vòng 03 ngày làm việc kể từ
ngày hoàn tất xác minh thông tin và
xử lý.
              </p>
              <p>
              Công ty TNHH Thanh Trúc Kinh Bắc sẽ cố gắng xác minh
thông tin và giải quyết khiếu nại nhanh chóng, kịp thời để
đảm bảo quyền lợi của Khách hàng. Trong trường hợp vượt quá khả năng và
thẩm quyền của Trung tâm, chúng tôi sẽ yêu cầu Khách hàng đưa vụ việc này
đến cơ quan nhà nước có thẩm quyền để giải quyết theo
quy định của pháp luật.
              </p>
 
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default HandlingProcess;
