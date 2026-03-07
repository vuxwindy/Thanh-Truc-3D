import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation, Trans } from 'react-i18next';

const Describe = () => {
  const { t } = useTranslation();
  return (
    <div className="mt-5">
      <section style={{ background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', color: "#fff", padding: "4rem 0", marginTop: "3rem" }}>
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="display-5 fw-bold mb-4">
                <Trans i18nKey="dashboard.describe.title1">Chúng tôi xây dựng <br /> nền tảng công nghệ vượt thời gian</Trans>
              </h2>
              <p className="text-secondary mb-4">
                {t('dashboard.describe.desc1')}
              </p>
              <Button variant="outline-light" size="lg">
                <a href={`/customer/games/category/2`} style={{ textDecoration: 'none', color: '#00ffe0' }}>
                  {t('dashboard.describe.btn1')}
                </a>
              </Button>
            </Col>
            <Col md={6}>
              <Image
                src="/banner7.png" // Thay bằng ảnh thực tế của bạn
                alt="Lucentis Team"
                fluid
                rounded
                style={{ filter: "brightness(0.7)" }} //làm mờ bên mặt
              />
              <p className="text-muted mt-2 text-center">
                {t('dashboard.describe.sub1')}
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section style={{ background: 'linear-gradient(135deg, #f2d9c7, #bc8c5d, #6e4c2b)', color: "#fff", padding: "4rem 0" }}>
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <Image
                src="/banner10.png" // Thay bằng ảnh thực tế của bạn
                alt="Lucentis Team"
                fluid
                rounded
                style={{ filter: "brightness(0.7)" }} //làm mờ bên mặt
              />
              <p className="text-muted mt-2 text-center">
                {t('dashboard.describe.sub2')}
              </p>
            </Col>
            <Col md={6}>
              <h2 className="display-5 fw-bold mb-4">
                <Trans i18nKey="dashboard.describe.title2">
                  Bí mật được chôn vùi <br /> trong từng đường kiếm, nơi danh dự và lòng trung thành bị thử thách.
                </Trans>
              </h2>
              <p className="text-light mb-4">
                {t('dashboard.describe.desc2')}
              </p>
              <Button variant="outline-light" size="lg">
                <a href={`/customer/games/category/1`} style={{ textDecoration: 'none', color: '#f2d9c7' }}>
                  {t('dashboard.describe.btn2')}
                </a>
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      <section style={{ color: "#fff", padding: "4rem 0" }}>
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="display-5 fw-bold mb-4">
                <Trans i18nKey="dashboard.describe.title3">Cuộc chiến công nghệ <br />  nơi quyền lực và bí mật đã bị che giấu</Trans>
              </h2>
              <p className="text-secondary mb-4">
                {t('dashboard.describe.desc3')}
              </p>
              <Button variant="outline-light" size="lg">
                <a href={`/customer/games/category/3`} style={{ textDecoration: 'none', color: '#00ffe0' }}>
                  {t('dashboard.describe.btn3')}
                </a>
              </Button>
            </Col>
            <Col md={6}>
              <Image
                src="/banner9.avif" // Thay bằng ảnh thực tế của bạn
                alt="Lucentis Team"
                fluid
                rounded
                style={{ filter: "brightness(0.7)" }} //làm mờ bên mặt
              />
              <p className="text-muted mt-2 text-center">
                {t('dashboard.describe.sub3')}
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </div>


  );
};

export default Describe;
