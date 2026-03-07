import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const AboutThanhTruc = () => {
  const { t } = useTranslation();

  const officeImages = [
    { src: "/sanhvanphong.jpg", title: t('about.office.lobby') },
    { src: "/khonggianchung.jpg", title: t('about.office.common') },
    { src: "/anninhmang.jpg", title: t('about.office.security') },
    { src: "/nhan-vien.jpg", title: t('about.office.sales') },
    { src: "/cskh.jpg", title: t('about.office.tech') },
    { src: "/anhPhongHop.jpg", title: t('about.office.meeting') },
  ];

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <section className="mt-4">
            <h1 className="entry-title mb uppercase">{t('about.title')}</h1>
            <p>
              <em>{t('about.subtitle')}</em>
            </p>
            <strong className="font-bold">
              {t('about.goalIntro')}
            </strong>
            <ul>
              <li>{t('about.goals.1')}</li>
              <li>{t('about.goals.2')}</li>
              <li>{t('about.goals.3')}</li>
            </ul>
            <p>&nbsp;</p>
            <h2>{t('about.officeTitle')}</h2>
            <Row>
              {officeImages.map((img, idx) => (
                <Col
                  key={idx}
                  xs={12}
                  sm={6}
                  md={4}
                  className="mb-4 text-center"
                >
                  <Image
                    src={img.src}
                    alt={img.title}
                    fluid
                    rounded
                    className="shadow-sm"
                  />
                  <p className="mt-2">{img.title}</p>
                </Col>
              ))}
            </Row>
            <p>&nbsp;</p>
            <h2>
              <strong>{t('about.whyChooseTitle')}</strong>
            </h2>
            &nbsp;
            <h3>
              <strong>{t('about.reason1Title')}</strong>
            </h3>
            <p>
              {t('about.reason1Desc')}
            </p>
            <ul>
              <li>{t('about.reason1Bullets.1')}</li>
              <li>
                {t('about.reason1Bullets.2')}
              </li>
              <li>
                {t('about.reason1Bullets.3')}
              </li>
            </ul>
            <h3>
              <strong>{t('about.reason2Title')}</strong>{" "}
            </h3>
            <p>
              {t('about.reason2Desc')}
            </p>
            <ul>
              <li>{t('about.reason2Bullets.1')}</li>
              <li>{t('about.reason2Bullets.2')}</li>
              <li>{t('about.reason2Bullets.3')}</li>
            </ul>
            <h3>
              <strong>{t('about.reason3Title')}</strong>
            </h3>
            <p>{t('about.reason3Desc1')}</p>
            <p>{t('about.reason3Desc2')}</p>
            <p>
              {t('about.reason3Desc3')}
            </p>
            <h3>
              <strong>{t('about.reason4Title')}</strong>
            </h3>
            <p>
              <strong>{t('about.reason4Warranty')}</strong>
            </p>
            <ul>
              <li>
                {t('about.reason4WarrantyBullets.1')}
              </li>
              <li>
                {t('about.reason4WarrantyBullets.2')}
              </li>
            </ul>
            <p>
              <strong>{t('about.reason4Support')}</strong>
            </p>
            <ul>
              <li>
                {t('about.reason4SupportBullets.1')}
              </li>
              <li>
                {t('about.reason4SupportBullets.2')}
              </li>
            </ul>
            <p>
              <strong>{t('about.reason4Team')}</strong>
            </p>
            <ul>
              <li>
                {t('about.reason4TeamBullets.1')}
              </li>
              <li>
                {t('about.reason4TeamBullets.2')}
              </li>
            </ul>
            <h3>
              <strong>{t('about.reason5Title')}</strong>
            </h3>
            <p>
              {t('about.reason5Desc')}
            </p>
            <p>&nbsp;</p>
            <h2>
              <strong>{t('about.contactTitle')}</strong>
            </h2>
            <p>
              {t('about.contactDesc')}
            </p>
            <p>
              {t('about.contactResolution')}
            </p>
            <p>
              {t('about.contactCommitment')}
            </p>
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutThanhTruc;
