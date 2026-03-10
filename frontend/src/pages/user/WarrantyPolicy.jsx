import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const WarrantyPolicy = () => {
  const { t } = useTranslation();

  return (
    <Container className="py-4">
      <Row>
        <Col>
          {/* Add more sections as needed */}

          <section className="mt-4">
            <h1 className="entry-title mb uppercase"> {t('warrantyPolicy.title')}</h1>
            <p className="lead">
              {t('warrantyPolicy.updated')} {new Date().toLocaleDateString()}
            </p>

            <ol>
              <li >
                <strong>{t('warrantyPolicy.li1')}</strong>
              </li>
            </ol>
            <p>
              {t('warrantyPolicy.p1')}
            </p>
            <ol start="2">
              <li >
                <strong>{t('warrantyPolicy.li2')}</strong>
              </li>
            </ol>
            <p>{t('warrantyPolicy.p2')}</p>
            <p>{t('warrantyPolicy.p3')}</p>
            <ol start="3">
              <li >
                <strong>
                  {t('warrantyPolicy.li3')}
                </strong>
              </li>
            </ol>
            <p>
              <strong>
                {t('warrantyPolicy.p4')}
              </strong>
            </p>
            <p>
              <strong>
                {t('warrantyPolicy.p5')}
              </strong>
            </p>
            <p>
              <strong>
                {t('warrantyPolicy.p6')}
              </strong>
            </p>


          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default WarrantyPolicy;
