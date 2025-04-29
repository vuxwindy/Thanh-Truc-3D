import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
 

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark text-light mt-5 py-4">
      <Container>
        <Row className="mb-4">
          <Col md={5}>
          <h5>About Thanh Truc</h5>
            <ul className="list-unstyled">
              <li>Business Name: <b> Thanh Truc Kinh Bac Company Limited </b></li>
              <li>MST/DKKD/QDTL: <b>2301283179</b></li>
              <li>Business Headquarters: <b>Do Nha Quarter, Phuong Lieu Ward, Que Vo Town, Bac Ninh</b></li>
              <li>Phone: <b>0949942222</b></li>
            </ul>          
          </Col>
          <Col md={2}>
            <h5>{t('footer.quickLinks')}</h5>
            <ul className="list-unstyled">
              <li><Link to="/customer/PrivacyPolicy" className="text-light text-decoration-none">Privacy Policy</Link></li>
              <li><Link to="/customer/PaymentMethods" className="text-light text-decoration-none">Payment Methods</Link></li>
              <li><Link to="/customer/InspectionPolicy" className="text-light text-decoration-none">Inspection Policy</Link></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>{t('Basic instruction')}</h5>
            <ul className="list-unstyled">
              {/* chỉnh lại đường dẫn + tạo file chứa +  mô tả*/}
              <li><Link to="/customer/HandlingProcess" className="text-light text-decoration-none">Complaints reception and handling process</Link></li>
              <li><Link to="/customer/RefundPolicy" className="text-light text-decoration-none">Return and refund policy</Link></li>
              <li><Link to="/customer/WarrantyPolicy" className="text-light text-decoration-none">Warranty policy</Link></li>
             
            </ul>
          </Col>

          <Col md={1}>
            <a href='http://online.gov.vn/Home/WebDetails/116237'>
              <img src='http://online.gov.vn/Content/EndUser/LogoCCDVSaleNoti/logoSaleNoti.png'
                   alt="Đã thông báo Bộ Công Thương" 
                   title="Đã thông báo Bộ Công Thương" 
                   style={{ height: '80px', width: 'auto' }}/>
            </a>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <p className="mb-0">&copy; {currentYear} Thanh Truc. {t('footer.allRightsReserved')}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;