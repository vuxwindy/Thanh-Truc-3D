import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

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
              Mọi khiếu nại, phản hồi, đánh giá của Khách hàng không liên quan đến đổi trả và hoàn tiền đều được giải quyết trên cơ sở
đàm phán, góp ý.</p>
<p>Chúng tôi  nhận mọi đóng góp ý kiến của khách hàng. Mọi ý kiến thắc mắc xin gửi đến: lucentiscompany@gmail.com</p>

<p>

Mọi trường hợp liên quan tới chính sách đổi trả và hoàn tiền sẽ được giải quyết trên cơ sở
đàm phán.</p>
<p>

 Trong trường hợp không đạt được thỏa thuận mong muốn,
một trong hai bên có quyền đưa vụ việc ra cơ quan Nhà nước có thẩm quyền
để giải quyết.
              </p>&nbsp;
              <p>
              Trong trường hợp xảy ra sự cố do lỗi của &nbsp;
                <u>lucentis.it.com</u>, chúng tôi sẽ ngay lập tức áp dụng các biện pháp cần thiết để đảm bảo quyền lợi của khách hàng.
              </p>
              <p>
                <strong>Điều 2: Phương pháp nộp khiếu nại</strong>.
              </p>
              <p>
              Khách hàng có thể gửi khiếu nại yêu cầu CÔNG TY TNHH LUCENTIS   giải quyết theo các cách sau:
              </p>
              <p>*Cách 1: Liên hệ qua facebook: <Link to={"https://www.facebook.com/profile.php?id=100016006836122"} target="_blank" >FACEBOOK</Link></p>
              <p>
                * Cách 2: Gửi email đến địa chỉ:&nbsp;
                <a href="mailto:lucentiscompany@gmail.com">
                  lucentiscompany@gmail.com
                </a>
              </p>
             
              <p>
                <strong>Điều 3: Quy trình thực hiện</strong>.
              </p>
              <p>
              *  <em>Bước 1: </em>Gửi khiếu nại.
              </p>
              <p>
              Khách hàng gửi khiếu nại về các dịch vụ hoặc quyền lợi chưa được CÔNG TY TNHH LUCENTIS   đảm bảo đầy đủ
              thông qua các phương thức nêu trên.
              </p>
              <p>
              *   <em>Bước 2: </em>Tiếp nhận.
              </p>
              <p>
              CÔNG TY TNHH LUCENTIS   sẽ tiếp nhận khiếu nại của
              Khách hàng và tiến hành xác minh thông tin. Trong vòng 03 ngày làm việc kể từ ngày tiếp nhận
              khiếu nại, chúng tôi sẽ liên hệ với Khách hàng để xác minh thông tin và thông báo về tiến trình xử lý.
              </p>
              <p>
              *  <em>Bước 3: </em>Trả lời khách hàng và xử lý khiếu nại.
              </p>
              <p>
              CÔNG TY TNHH LUCENTIS   sẽ phản hồi kết quả
xử lý khiếu nại cho Khách hàng trong vòng 03 ngày làm việc kể từ
ngày hoàn tất xác minh thông tin và
xử lý. Trong trường hợp cần thêm thời gian để xác minh và xử lý, chúng tôi sẽ thông báo
cho Khách hàng biết lý do và thời gian dự kiến hoàn tất việc xử lý.
              </p>
              <p>
              CÔNG TY TNHH LUCENTIS cùng các bên liên quan sẽ cố gắng xác minh
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
