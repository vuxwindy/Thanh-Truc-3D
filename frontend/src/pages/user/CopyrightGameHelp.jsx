import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const AboutThanhTruc = () => {
  const { t } = useTranslation();

  return (
    <Container className="py-4">
      <Row>
        <Col>
          {/* Add more sections as needed */}

          <section className="mt-4">
            <h1 className="entry-title mb uppercase"><strong>{t('copyrightGameHelp.title')}</strong></h1>
            <p>
              <strong>{t('copyrightGameHelp.p1')}</strong>
            </p>
            <p>{t('copyrightGameHelp.p2')}</p>
            <p>{t('copyrightGameHelp.p3')}</p>
            <p>&nbsp;</p>


            <h2><strong>{t('copyrightGameHelp.h1')}</strong></h2>
            <p>{t('copyrightGameHelp.p4')}</p>
            <p>{t('copyrightGameHelp.p5')}</p>
            <p>{t('copyrightGameHelp.p6')}</p>

            <Row className="justify-content-center">
              <Col xs={12} md={10} lg={12} className="text-center">
                <Image src="/banner1.jpg" alt={t('copyrightGameHelp.img1')} fluid rounded className="shadow mb-3"
                  style={{ height: "400px", objectFit: "cover", width: "100%" }} />
                <p className="text-muted">{t('copyrightGameHelp.img1')}</p>
              </Col>
            </Row>

            <p>&nbsp;</p>
            <h2>
              <strong>{t('copyrightGameHelp.h2')}</strong>
            </h2>
            &nbsp;

            <p>
              {t('copyrightGameHelp.p7')}

            </p>
            <Row className="justify-content-center">
              <Col xs={12} md={10} lg={12} className="text-center">
                <Image src="/banner2.jpg" alt={t('copyrightGameHelp.img2')} fluid rounded className="shadow mb-3"
                  style={{ height: "400px", objectFit: "cover", width: "100%" }} />
                <p className="text-muted">{t('copyrightGameHelp.img2')}</p>
              </Col>
            </Row>
            <p>{t('copyrightGameHelp.p8')}</p>
            <p>&nbsp;</p>
            <h2>
              <strong>{t('copyrightGameHelp.h3')}</strong>{" "}
            </h2>
            <p>
              {t('copyrightGameHelp.p9')} &nbsp;</p>
            <p>  {t('copyrightGameHelp.p10')} </p>
            <p>{t('copyrightGameHelp.p11')}
            </p>
            <p>{t('copyrightGameHelp.p12')}
            </p>
            <p> {t('copyrightGameHelp.p13')} </p>
            <p> &nbsp;</p>
            <h2>
              <strong>{t('copyrightGameHelp.h4')}</strong>
            </h2>
            <p>{t('copyrightGameHelp.p14')}</p>
            <p>{t('copyrightGameHelp.p15')}</p>

            <Row className="justify-content-center">
              <Col xs={12} md={10} lg={12} className="text-center">
                <Image src="/banner3.jpg" alt={t('copyrightGameHelp.img3')} fluid rounded className="shadow mb-3"
                  style={{ height: "400px", objectFit: "cover", width: "100%" }} />
                <p className="text-muted">{t('copyrightGameHelp.img3')}</p>
              </Col>
            </Row>
            <p> <strong>{t('copyrightGameHelp.p16')}</strong>
            </p>
            <p>{t('copyrightGameHelp.p17')}</p>
            <p>{t('copyrightGameHelp.p18')}</p>       <p> &nbsp;</p>
            <h2>
              <strong>{t('copyrightGameHelp.h5')}</strong>
            </h2>
            <p>
              {t('copyrightGameHelp.p19')}
            </p>
            <p>{t('copyrightGameHelp.p20')}</p>

            <p>{t('copyrightGameHelp.p21')}</p>
            <Row className="justify-content-center">
              <Col xs={12} md={10} lg={12} className="text-center">
                <Image src="/banner4.jpg" alt={t('copyrightGameHelp.img4')} fluid rounded className="shadow mb-3"
                  style={{ height: "400px", objectFit: "cover", width: "100%" }} />
                <p className="text-muted">{t('copyrightGameHelp.img4')}</p>
              </Col>
            </Row>
            <p> &nbsp;</p>
            <h2>
              <strong>{t('copyrightGameHelp.h6')}</strong>
            </h2>
            <p>{t('copyrightGameHelp.p22')}</p>
            <Row className="justify-content-center">
              <Col xs={12} md={10} lg={12} className="text-center">
                <Image src="/banner5.jpg" alt={t('copyrightGameHelp.img5')} fluid rounded className="shadow mb-3"
                  style={{ height: "400px", objectFit: "cover", width: "100%" }} />
                <p className="text-muted">{t('copyrightGameHelp.img5')}</p>
              </Col>
            </Row>
            <p> &nbsp;</p>
            <h2><strong>{t('copyrightGameHelp.h7')}</strong></h2>
            <p>{t('copyrightGameHelp.p23')}</p>
            <p>{t('copyrightGameHelp.p24')}</p>

            <p>{t('copyrightGameHelp.p25')}</p>
            <Row className="justify-content-center">
              <Col xs={12} md={10} lg={12} className="text-center">
                <Image src="/banner6.jpg" alt={t('copyrightGameHelp.img6')} fluid rounded className="shadow mb-3"
                  style={{ height: "400px", objectFit: "cover", width: "100%" }} />
                <p className="text-muted">{t('copyrightGameHelp.img6')}</p>
              </Col>
            </Row>
            <p> &nbsp;</p>
            <p><em>{t('copyrightGameHelp.p26')}</em></p>
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutThanhTruc;
