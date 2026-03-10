import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";

const HandlingProcess = () => {
  const { t } = useTranslation();

  return (
    <Container className="py-4">
      <Row>
        <Col>
          {/* Add more sections as needed */}

          <section className="mt-4">
            <h1 className="entry-title mb uppercase"> {t('handlingProcess.title')}</h1>
            <p className="lead">
              {t('handlingProcess.updated')} {new Date().toLocaleDateString()}
            </p>



            <p>
              <strong>{t('handlingProcess.art1')}</strong>
            </p>
            <p>{t('handlingProcess.p1')}</p>
            <p>{t('handlingProcess.p2')}</p>

            <p>{t('handlingProcess.p3')}</p>
            <p>
              {t('handlingProcess.p4')}
            </p>&nbsp;
            <p>
              <Trans i18nKey="handlingProcess.p5">
                Trong trường hợp xảy ra sự cố do lỗi của &nbsp;
                <u>lucentis.it.com</u>, chúng tôi sẽ ngay lập tức áp dụng các biện pháp cần thiết để đảm bảo quyền lợi của khách hàng.
              </Trans>
            </p>
            <p>
              <strong>{t('handlingProcess.art2')}</strong>
            </p>
            <p>
              {t('handlingProcess.p6')}
            </p>
            <p>{t('handlingProcess.p7')} <Link to={"https://www.facebook.com/profile.php?id=100016006836122"} target="_blank" >FACEBOOK</Link></p>
            <p>
              {t('handlingProcess.p8')}&nbsp;
              <a href="mailto:lucentiscompany@gmail.com">
                lucentiscompany@gmail.com
              </a>
            </p>

            <p>
              <strong>{t('handlingProcess.art3')}</strong>
            </p>
            <p>
              <em>{t('handlingProcess.p9')}</em>
            </p>
            <p>
              {t('handlingProcess.p10')}
            </p>
            <p>
              <em>{t('handlingProcess.p11')}</em>
            </p>
            <p>
              {t('handlingProcess.p12')}
            </p>
            <p>
              <em>{t('handlingProcess.p13')}</em>
            </p>
            <p>
              {t('handlingProcess.p14')}
            </p>
            <p>
              {t('handlingProcess.p15')}
            </p>

          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default HandlingProcess;
