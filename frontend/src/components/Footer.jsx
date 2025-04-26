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
          <Col md={4}>
            <h5>{t('footer.about')}</h5>
            <p>{t('footer.aboutDescription')}</p>
          </Col>
          <Col md={4}>
            <h5>{t('footer.quickLinks')}</h5>
            <ul className="list-unstyled">
              <li><Link to="/customer/terms" className="text-light text-decoration-none">{t('footer.termsConditions')}</Link></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>{t('footer.connectWithUs')}</h5>
            <div className="d-flex gap-3">
              <a href="#" className="text-light"><FaFacebook size={24} /></a>
              <a href="#" className="text-light"><FaTwitter size={24} /></a>
              <a href="#" className="text-light"><FaInstagram size={24} /></a>
              <a href="#" className="text-light"><FaYoutube size={24} /></a>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <p className="mb-0">&copy; {currentYear} Web2D. {t('footer.allRightsReserved')}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;