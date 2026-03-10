import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation, Trans } from 'react-i18next';

const RefundPolicy = () => {
  const { t } = useTranslation();
  return (
    <Container className="py-4 py-md-5">
      <Row className="justify-content-center">
        <Col lg={10} xl={8}>
          <div className="bg-dark text-light p-4 p-md-5 rounded shadow-sm" style={{ border: '1px solid #333' }}>
            <h1 className="text-center mb-4 text-primary" style={{ fontWeight: 'bold' }}>
              {t('refundPolicy.title')}<br />
              <span className="fs-4 text-secondary">{t('refundPolicy.subtitle')}</span>
            </h1>

            <p className="lead border-bottom border-secondary pb-3 mb-4">
              {t('refundPolicy.intro')}
            </p>

            <section className="mb-4">
              <h4 className="text-info fw-bold mb-3">{t('refundPolicy.section1.title')}</h4>
              <p><Trans i18nKey="refundPolicy.section1.p1">Tất cả các sản phẩm/dịch vụ được bán trên website đều được cung cấp theo nguyên tắc <strong>“Bán đứt – Không hoàn tiền” (All Sales Are Final)</strong>.</Trans></p>
              <p>{t('refundPolicy.section1.p2')}</p>
              <p>{t('refundPolicy.section1.p3')}</p>
              <ul className="text-secondary" style={{ listStyleType: "disc", paddingLeft: "1.5rem" }}>
                <li>{t('refundPolicy.section1.l1')}</li>
                <li>{t('refundPolicy.section1.l2')}</li>
                <li>{t('refundPolicy.section1.l3')}</li>
                <li>{t('refundPolicy.section1.l4')}</li>
                <li>{t('refundPolicy.section1.l5')}</li>
              </ul>
            </section>

            <section className="mb-4">
              <h4 className="text-info fw-bold mb-3">{t('refundPolicy.section2.title')}</h4>
              <p>{t('refundPolicy.section2.p1')}</p>
              <ul className="text-secondary" style={{ listStyleType: "disc", paddingLeft: "1.5rem" }}>
                <li>{t('refundPolicy.section2.l1')}</li>
                <li>{t('refundPolicy.section2.l2')}</li>
                <li>{t('refundPolicy.section2.l3')}</li>
                <li>{t('refundPolicy.section2.l4')}</li>
                <li>{t('refundPolicy.section2.l5')}</li>
              </ul>
            </section>

            <section className="mb-4">
              <h4 className="text-info fw-bold mb-3">{t('refundPolicy.section3.title')}</h4>
              <p>{t('refundPolicy.section3.p1')}</p>
              <ul className="text-secondary" style={{ listStyleType: "disc", paddingLeft: "1.5rem" }}>
                <li>{t('refundPolicy.section3.l1')}</li>
                <li>{t('refundPolicy.section3.l2')}</li>
                <li>{t('refundPolicy.section3.l3')}</li>
              </ul>
              <p className="text-warning">{t('refundPolicy.section3.warning')}</p>
            </section>

            <section className="mb-4">
              <h4 className="text-info fw-bold mb-3">{t('refundPolicy.section4.title')}</h4>
              <p>{t('refundPolicy.section4.p1')}</p>
              <ul className="text-secondary" style={{ listStyleType: "disc", paddingLeft: "1.5rem" }}>
                <li>{t('refundPolicy.section4.l1')}</li>
                <li>{t('refundPolicy.section4.l2')}</li>
              </ul>
              <p className="text-danger fw-bold">{t('refundPolicy.section4.warning')}</p>
            </section>

            <section className="mb-0">
              <h4 className="text-info fw-bold mb-3">{t('refundPolicy.section5.title')}</h4>
              <p className="mb-0 text-secondary">
                {t('refundPolicy.section5.p1')}
              </p>
            </section>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RefundPolicy;
