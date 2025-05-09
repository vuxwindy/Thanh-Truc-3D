import React , { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
 
import Terms from './Terms';
import PrivacyPolicy from './PrivacyPolicy';
import PaymentMethods from './PaymentMethods';
import HandlingInstall from './HandlingInstall';
import HandlingProcess from './HandlingProcess';
import RefundPolicy from './RefundPolicy';
import WarrantyPolicy from './WarrantyPolicy';
import InspectionPolicy from './InspectionPolicy';
import AboutThanhTruc from './AboutThanhTruc';
import CopyrightGameHelp from './CopyrightGameHelp';

const Termsc = () => {
  const [selectedPage, setSelectedPage] = useState("AboutThanhTruc");
  const menu = [
    { title: "Giới thiệu về Lucentis", key: "AboutThanhTruc" },
    { title: "Lý do nên mua game bản quyền", key: "CopyrightGameHelp" },
    { title: "Chính sách bảo mật", key: "PrivacyPolicy" },
    { title: "Chính sách kiểm tra", key: "InspectionPolicy" },
    { title: "Chính sách hoàn trả và hoàn tiền", key: "RefundPolicy" },
    { title: "Chính sách bảo hành", key: "WarrantyPolicy" },
    { title: "Quy trình tiếp nhận và xử lý khiếu nại", key: "HandlingProcess" },
    { title: "Hướng dẫn cài đặt phần mền", key: "HandlingInstall" },
    { title: "Hướng dẫn thanh toán", key: "PaymentMethods" },
    { title: "Hướng dẫn mua hàng", key: "Terms" },
  ];
  const renderContent = () => {
    switch (selectedPage) {
      case "PrivacyPolicy":
        return <PrivacyPolicy />;
      case "Terms":
        return <Terms />;
      case "PaymentMethods":
        return <PaymentMethods />;
      case "HandlingInstall":
        return <HandlingInstall />;
      case "HandlingProcess":
        return <HandlingProcess />;
      case "InspectionPolicy":
        return <InspectionPolicy />;
      case "RefundPolicy":
        return <RefundPolicy />;
      case "WarrantyPolicy":
        return <WarrantyPolicy />;
      case "AboutThanhTruc":
        return <AboutThanhTruc />;
      case "CopyrightGameHelp":
      return <CopyrightGameHelp />;
      // case "CopyrightGameHelp":
      //   return <CopyrightGameHelp />;
      default:
        return <p>Vui lòng chọn mục bên trái để xem nội dung.</p>;
    }
  };
  return (
    <Container className="py-4">
      <Row>
        <Col>
          {/* Add more sections as needed */}
          
          <section className="mt-4">
					 <em>* Trong tài liệu này chúng tôi sẽ hướng dẫn từ A-Z các bước để bạn có thể mua hàng tại Lucentis một cách dễ dàng và thuận tiện nhất. 
              Cùng với đó là nắm được các chính sách bảo hành và được hỗ trợ nhanh chóng bởi đội ngũ CSKH đáng tự hào của Lucentis.
           </em>
          </section>
        </Col>
      </Row>

      <Row className="my-5">
      {/* Sidebar bên trái */}
      <Col md={3}>
            <ul className="list-group">
            {menu.map((item, idx) => (
              <li
                key={idx}
                className={`list-group-item ${selectedPage === item.key ? "active" : ""}`}
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedPage(item.key)}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </Col>

      {/* Nội dung bên phải */}
      <Col md={9}>{renderContent()}</Col>
      </Row>

       
     
     
    </Container>
  );
};

export default Termsc;