import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const AboutUs = () => {
  const { t } = useTranslation();
  return (

    <div className="position-relative "
      style={{
        backgroundImage: `url('/bg-image.png')`,
        color: "#fff",
        padding: "60px 0",
        minHeight: "100vh",
      }}
    >
      <Container>
        {/* Giới thiệu */}
        {/* <Row className="mb-5">
          <Col>
            <h1 className="text-center mb-4 display-5 fw-bold">
              About Lucentis
            </h1>
            <div
              className="p-5 rounded-4 "
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.13)",
                border: "1px solid transparent",
              }}
            >
              <p className="lead mb-3">
                Chào mừng đến với <strong>Lucentis</strong> - điểm đến hàng đầu
                của bạn cho các sản phẩm phần mền chất lượng cao.
              </p>
              <p>
                Được thành lập vào năm 2020, chúng tôi chuyên cung cấp mã nguồn đặc biệt dùng được trên nhiều hệ điều hàng, trong nhiều lĩnh vực khác nhau. Bộ sưu tập được
                tuyển chọn cẩn thận của chúng tôi bao gồm các sản phẩm theo su hướng mới nhất
                và phổ biến nhất trên di động, trên web điều đặc biệt là đều được ứng dụng blockchain.
              </p>
              <p>
                Với đội ngũ đam mê công nghệ và yêu thích công nghệ mới - blockchain, Lucentis không
                chỉ là một nền tảng bán hàng – chúng tôi là người bạn đồng hành
                của mọi lập trình viên. Từ sản phẩm bản quyền đến các dịch vụ hỗ trợ
                cộng đồng, chúng tôi luôn đặt sự hài lòng và bảo mật an toàn thông tin của khách
                hàng lên hàng đầu.
              </p>
              <p>
                Sự khác biệt của Lucentis đến từ sự kết hợp giữa công nghệ
                hiện đại, dịch vụ tận tâm và cam kết không ngừng cải tiến. Chúng
                tôi tự hào là cầu nối giữa người dung với nhà phát triển phần mền trên thế giới –
                nơi mà mỗi trải nghiệm đều đáng nhớ.
              </p>
            </div>
          </Col>
        </Row> */}
        <Col>
          <h2 className="mb-4 fw-semibold text-center">
            {t('dashboard.aboutUs.title1')}
          </h2>
        </Col>
        {/* Dịch vụ */}
        <Row className="mb-5 text-center">
          {[
            {
              title: t('dashboard.aboutUs.service1.title'),
              text: t('dashboard.aboutUs.service1.desc'),
              icon: "🎮",
              link: "/customer/games/category/1",
            },
            {
              title: t('dashboard.aboutUs.service2.title'),
              text: t('dashboard.aboutUs.service2.desc'),
              icon: "🔒",
              link: "/customer/PrivacyPolicy",
            },
            {
              title: t('dashboard.aboutUs.service3.title'),
              text: t('dashboard.aboutUs.service3.desc'),
              icon: "🤝",
              link: "/customer/user-manual",
            },
          ].map((item, idx) => (
            <Col md={4} className="mb-4" key={idx}>
              <Link to={item.link} style={{ textDecoration: "none" }}>
                <Card
                  className="h-100 rounded-4 "
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.13)",
                    border: "1px solid transparent",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.03)";
                    e.currentTarget.style.border =
                      "1px solid rgba(255, 255, 255, 0.2)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 16px rgba(255, 255, 255, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.border = "1px solid transparent";
                    e.currentTarget.style.boxShadow =
                      "0 4px 8px rgba(0, 0, 0, 0.2)";
                  }}
                >
                  <Card.Body className="text-light">
                    <div className="display-4 mb-3">{item.icon}</div>
                    <h3 className="h5 fw-bold">{item.title}</h3>
                    <p>{item.text}</p>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>

        {/* Mission */}
        <Row>
          <Col>
            <div
              className="text-center p-5 rounded-4 shadow"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.13)',
                border: "1px solid transparent",
              }}
            >
              <h2 className="mb-3 fw-semibold">{t('dashboard.aboutUs.title2')}</h2>
              <p>
                {t('dashboard.aboutUs.mission1')}
              </p>
              <p>
                {t('dashboard.aboutUs.mission2')}
              </p>
              <p>
                {t('dashboard.aboutUs.mission3')}
              </p>
              <p className="mb-0">
                {t('dashboard.aboutUs.mission4')}
              </p>
              <div
                className="position-absolute bottom-0 start-0 w-100 h-50"
                style={{
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0) 60%, #1a1a1a 100%)',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutUs;
