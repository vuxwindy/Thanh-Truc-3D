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
          <h5>Giới thiệu về Lucentis</h5>
            <ul className="list-unstyled">
              <li>Tên Doanh Nghiệp: <b> Công ty TNHH Thanh Trúc Kinh Bắc </b></li>
              <li>MST/DKKD/QDTL: <b>2301283179</b></li>
              <li>Trụ Sở Doanh Nghiệp: <b>Khu phố Đỗ Nhà, Phường Phương Liễu, Thị xã Quế Võ,Tỉnh Bắc Ninh, Việt Nam</b></li>
              <li>Điện Thoại: <b>0949942222</b></li>
            </ul>          
          </Col>
          <Col md={2}>
            {/* <h5>{t('footer.quickLinks')}</h5> */}
            <h5>Hỗ Trợ</h5>
            <ul className="list-unstyled"> 
              <li><Link to="/customer/PrivacyPolicy" className="text-light text-decoration-none">Chính sách bảo mật</Link></li>
              <li><Link to="/customer/PaymentMethods" className="text-light text-decoration-none">Phương thức thanh toán</Link></li>
              <li><Link to="/customer/InspectionPolicy" className="text-light text-decoration-none">Chính sách kiểm tra</Link></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Liên hệ:</h5>
            <ul className="list-unstyled">
              {/* chỉnh lại đường dẫn + tạo file chứa +  mô tả*/}
              <li>Mail: <a href="mailto: thanhtruckinhbac@gmail.com">thanhtruckinhbac@gmail.com</a></li>
              <li>Hostline:  0949942222 </li>
              <li>Facebook: <a href="https://www.facebook.com/profile.php?id=100016006836122"><FaFacebook /></a> </li>             
            </ul>
          </Col>
  {/* <img src='http://online.gov.vn/Content/EndUser/LogoCCDVSaleNoti/logoSaleNoti.png' */}
          {/* <Col md={1}>
            <a href='http://online.gov.vn/Home/WebDetails/116237'>
            
              <img src='/logoSale.png'
                   alt="Đã thông báo Bộ Công Thương" 
                   title="Đã thông báo Bộ Công Thương" 
                   style={{ height: '80px', width: 'auto' }}/>
            </a>
          </Col> */}
        </Row>
        <Row>
          <Col className="text-center">
            <p className="mb-0">&copy; {currentYear} Lucentis. {t('footer.allRightsReserved')}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;