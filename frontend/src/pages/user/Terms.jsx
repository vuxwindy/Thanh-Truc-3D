import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation, Trans } from 'react-i18next';

const Terms = () => {
  const { t } = useTranslation();

  return (
    <Container className="py-4 text-light">
      <Row>
        <Col>
          {/* Add more sections as needed */}

          <section className="mt-4">
            <h1 className="entry-title mb uppercase">{t('terms.title')}</h1>
            <p className="lead">{t('terms.updated')} {new Date().toLocaleDateString()}</p>
            <p>{t('terms.intro')}</p>
            <p><strong>Bước 1: </strong>{t('terms.step1')}</p>
            <img
              src="/BuyingGuideS1.png"
              className="img-fluid rounded mx-auto d-block"
              alt="BuyingGuideS1"
            />
            <p>&nbsp;</p>
            <p><strong>Bước 2: </strong>{t('terms.step2')}</p>
            <img
              src="/BuyingGuideS2.png"
              className="img-fluid rounded mx-auto d-block"
              alt="BuyingGuideS2"
            />
            <p>&nbsp;</p>
            <p><strong>Bước 3:</strong> {t('terms.step3')}</p>
            <img
              src="/BuyingGuideS3.png"
              className="img-fluid rounded mx-auto d-block"
              alt="BuyingGuideS3"
            />
            <p>{t('terms.step3Success')}</p>
            <p>&nbsp;</p>
            <p><strong>Bước 4:</strong> <span dangerouslySetInnerHTML={{ __html: t('terms.step4') }} ></span></p>
            <p><span dangerouslySetInnerHTML={{ __html: t('terms.step4Proceed') }} ></span></p>
            <img
              src="/BGS6.png"
              className="img-fluid rounded mx-auto d-block"
              alt="BuyingGuideS3"
            />
            <p>&nbsp;</p>
            <p>{t('terms.step4Redirect')}</p>
            <p><strong>Bước 5:</strong> {t('terms.step5')}</p>
            <p> <span dangerouslySetInnerHTML={{ __html: t('terms.step5Card') }} ></span></p>
            <p><span dangerouslySetInnerHTML={{ __html: t('terms.step5Paypal') }} ></span></p>
            <img
              src="/BGS2.png"
              className="img-fluid rounded mx-auto d-block"
              alt="BuyingGuideS3"
            />
            <p>&nbsp;</p>

            <p><strong>The Debit or Credit </strong>  {t('terms.step5CardProcess')} </p>
            <p> {t('terms.step5EnterInfo')}</p>
            <img
              src="/BGS3.png"
              className="img-fluid rounded mx-auto d-block"
              alt="BuyingGuideS3"
            />

            <p>&nbsp;</p>
            <p><strong>Bước 6:</strong>  {t('terms.step6')}</p>
            <p>{t('terms.step6Success')}</p>
            <img
              src="/BGS4.png"
              className="img-fluid rounded mx-auto d-block"
              alt="BuyingGuideS3"
            />
            <p>&nbsp;</p>
            <p><strong>Bước 7:</strong> {t('terms.step7')}</p>
            <img
              src="/emailProduct.png"
              className="img-fluid rounded mx-auto d-block"
              alt="Email Product "
            />
            <p>&nbsp;</p>

          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default Terms;