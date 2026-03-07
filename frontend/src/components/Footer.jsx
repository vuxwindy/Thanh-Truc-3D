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
            <h5>{t('footer.companyInfo')}</h5>
            <ul className="list-unstyled">
              <li>
                {t('footer.headquartersLabel')}
                <b>{t('footer.headquartersAddress')}</b>
              </li>
              <li>
                {t('footer.phoneLabel')}<b>0332354286</b>
              </li>
              <li>
                {t('footer.emailLabel')}<b>lucentiscompany@gmail.com</b>
              </li>
            </ul>
          </Col>
          <Col md={2}>
            <h5>{t('footer.support')}</h5>
            <ul className="list-unstyled">
              <li>
                <Link
                  to="/customer/PrivacyPolicy"
                  className="text-light text-decoration-none"
                >
                  {t('footer.privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link
                  to="/customer/PaymentMethods"
                  className="text-light text-decoration-none"
                >
                  {t('footer.paymentMethods')}
                </Link>
              </li>
              <li>
                <Link
                  to="/customer/InspectionPolicy"
                  className="text-light text-decoration-none"
                >
                  {t('footer.inspectionPolicy')}
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>{t('footer.contact')}</h5>
            <ul className="list-unstyled">
              <li>
                Mail:{" "}
                <a href="mailto: lucentiscompany@gmail.com">
                  lucentiscompany@gmail.com
                </a>
              </li>
              <li>
                Facebook: {" "}
                <a href="https://www.facebook.com/LucentisCompany" target="_blank" rel="noopener noreferrer">
                {"Lucentis"}
                </a>{" "}
              </li>
            </ul>
          </Col>
        
          <Col md={1}>
            <a href='http://online.gov.vn/Home/WebDetails/132073'>           
              <img src='/logoSale.png'
                   alt={t('footer.govBadgeAlt')} 
                   title={t('footer.govBadgeAlt')} 
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
