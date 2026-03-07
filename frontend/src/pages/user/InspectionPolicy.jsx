import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation, Trans } from "react-i18next";

const InspectionPolicy = () => {
  const { t } = useTranslation();

  return (
    <Container className="py-4 text-light">
      <Row>
        <Col>
          {/* Add more sections as needed */}

          <section className="mt-4">
            <h1 className="entry-title mb uppercase">{t('inspectionPolicy.title')}</h1>
            <p className="lead">
              {t('inspectionPolicy.updated')} {new Date().toLocaleDateString()}
            </p>


            <p>
              <Trans i18nKey="inspectionPolicy.p1">
                Để bảo vệ quyền lợi của khách hàng khi mua sắm trên
                <a href="https://lucentis.it.com"> lucentis.it.com</a>, chúng tôi có chính sách hỗ trợ khách hàng kiểm tra
                khi nhận hàng. Tức là khi bạn nhận được đường link từ email,
                bạn được phép cài đặt và kiểm tra trực tiếp.
              </Trans>
            </p>
            &nbsp;
            <h2>
              <strong>{t('inspectionPolicy.subtitle')}</strong>
            </h2>
            <p>
              {t('inspectionPolicy.p2')}
            </p>
            {/* <p>* Cách 1: Gọi đến số hotline của chúng tôi: 0332354286</p>
            <p>
              * Cách 2: Gửi email đến địa chỉ:&nbsp;
              <a href="mailto:lucentiscompany@gmail.com">
                lucentiscompany@gmail.com
              </a>
            </p>
            <p>
              * Cách 3: Đến trực tiếp địa chỉ: Khu phố Đỗ Nha, Phường Phương
              Liễu, Thị xã Quế Võ, Tỉnh Bắc Ninh.
            </p> */}
            <p>
              {t('inspectionPolicy.p3')}
            </p>
            <p>
              {t('inspectionPolicy.p4')}
            </p>

          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default InspectionPolicy;
