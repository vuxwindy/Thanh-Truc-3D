import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-light py-3" style={{ backgroundColor: "#1a1a1a" }}>
      <Container>
        <Row className="mt-4 py-3" >
          <Col md={5}>
            <h5>Thông tin liên hệ Công ty TNHH Lucentis</h5>
            <ul className="list-unstyled">
              <li>
                Địa chỉ trụ sở chính:{" "}
                <b>
                  Khu phố Do Nha, Phường Phương Liễu, Thị xã Quế Võ, Tỉnh Bắc Ninh, Việt Nam.
                </b>
              </li>
              <li>
                Số điện thoại: <b>0332354286</b>
              </li>
              <li>
                Email: <b>lucentiscompany@gmail.com</b>
              </li>
            </ul>
          </Col>
          <Col md={2}>
            {/* <h5>{t('footer.quickLinks')}</h5> */}
            <h5>Hỗ Trợ</h5>
            <ul className="list-unstyled">
              <li>
                <Link
                  to="/customer/PrivacyPolicy"
                  className="text-light text-decoration-none"
                >
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link
                  to="/customer/PaymentMethods"
                  className="text-light text-decoration-none"
                >
                  Phương thức thanh toán
                </Link>
              </li>
              <li>
                <Link
                  to="/customer/InspectionPolicy"
                  className="text-light text-decoration-none"
                >
                  Chính sách kiểm tra
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Liên hệ:</h5>
            <ul className="list-unstyled">
              {/* chỉnh lại đường dẫn + tạo file chứa +  mô tả*/}
              <li>
                Mail:{" "}
                <a href="mailto: lucentiscompany@gmail.com">
                  lucentiscompany@gmail.com
                </a>
              </li>
              {/* <li>Hotline: 0332354286 </li> */}
              <li>
                Facebook: {" "}
                <a href="https://www.facebook.com/LucentisCompany" target="_blank" rel="noopener noreferrer">
                {"Lucentis"}
                </a>{" "}
              </li>
            </ul>
          </Col>
          {/* lucentis.it.com   */}
        
          <Col md={1}>
            <a href='http://online.gov.vn/Home/WebDetails/132073'>           
              <img src='/logoSale.png'
                   alt="Đã thông báo Bộ Công Thương" 
                   title="Đã thông báo Bộ Công Thương" 
                   style={{ height: '80px', width: 'auto' }}/>
            </a>
          </Col> 
        </Row>
        <Row>
          <Col className="text-center">
            <hr style={{ border: "none", height: "2px", background: "#ccc" }} />
            <p className="mb-0">
              &copy; {currentYear} Lucentis. {t("footer.allRightsReserved")}
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
