import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <Container className="py-4 text-light">
      <Row>
        <Col>
          {/* Add more sections as needed */}

          <section className="mt-4">
            <h1 className="entry-title mb uppercase">{t('privacyPolicy.title')}</h1>
            <p className="lead">
              {t('privacyPolicy.updated')} {new Date().toLocaleDateString()}
            </p>

            <p>{t('privacyPolicy.p1')}</p>
            <p>
              {t('privacyPolicy.p2')}
              <br />
              {t('privacyPolicy.p2_1')}
              <br />
              {t('privacyPolicy.p2_2')}
            </p>
            <p>{t('privacyPolicy.p3')}</p>
            <p>
              <strong>{t('privacyPolicy.corePrivacy')}</strong>
              <br />
              {t('privacyPolicy.corePrivacyDesc')}
            </p>
            <ul>
              <li>
                <strong>{t('privacyPolicy.coreL1')}</strong>
              </li>
              <li>
                <strong>{t('privacyPolicy.coreL2')}</strong>
              </li>
              <li>
                <strong>{t('privacyPolicy.coreL3')}</strong>
              </li>
              <li>
                <strong>{t('privacyPolicy.coreL4')}</strong>
              </li>
            </ul>
            <p>{t('privacyPolicy.coreDesc1')}</p>
            <p>{t('privacyPolicy.coreDesc2')}</p>
            <p>
              <strong>{t('privacyPolicy.whatWeCollect')}</strong>
            </p>
            <p>
              <strong>{t('privacyPolicy.collectP1Title')}</strong>
              <br />
              {t('privacyPolicy.collectP1')}
            </p>
            <p>
              <strong>{t('privacyPolicy.collectP2Title')}</strong>
              <br />
              {t('privacyPolicy.collectP2')}
            </p>
            <p>
              <strong>{t('privacyPolicy.collectP3Title')}</strong>
              <br />
              {t('privacyPolicy.collectP3')}
            </p>
            <p>
              <strong>{t('privacyPolicy.collectP4Title')}</strong>
              <br />
              {t('privacyPolicy.collectP4')}
            </p>
            <p>
              <strong>{t('privacyPolicy.usePersonalData')}</strong>
              <br />
              {t('privacyPolicy.usePersonalDataDesc')}
            </p>
            <ul>
              <li>
                <strong>{t('privacyPolicy.useL1')}</strong>
              </li>
              <li>
                <strong>{t('privacyPolicy.useL2')}</strong>
              </li>
              <li>
                <strong>{t('privacyPolicy.useL3')}</strong>
              </li>
              <li>
                <strong>{t('privacyPolicy.useL4')}</strong>
              </li>
              <li>
                <strong>{t('privacyPolicy.useL5')}</strong>
              </li>
              <li>
                <strong>{t('privacyPolicy.useL6')}</strong>
              </li>
              <li>
                <strong>{t('privacyPolicy.useL7')}</strong>
              </li>
              <li>
                <strong>{t('privacyPolicy.useL8')}</strong>
              </li>
              <li>
                <strong>{t('privacyPolicy.useL9')}</strong>
              </li>
              <li>
                <strong>{t('privacyPolicy.useL10')}</strong>
              </li>
            </ul>
            <p>
              <strong>{t('privacyPolicy.disclosure')}</strong>
              <br />
              {t('privacyPolicy.disclosureDesc')}
            </p>
            <ul>
              <li>
                <strong>{t('privacyPolicy.disclosureL1')}</strong>
              </li>
              <li>
                <strong>{t('privacyPolicy.disclosureL2')}</strong>
              </li>
              <li>
                <strong>{t('privacyPolicy.disclosureL3')}</strong>
              </li>
              <li>
                <strong>{t('privacyPolicy.disclosureL4')}</strong>
              </li>
              <li>
                <strong>{t('privacyPolicy.disclosureL5')}</strong>
              </li>
            </ul>
            <p>{t('privacyPolicy.disclosureP1')}</p>
            <p>{t('privacyPolicy.disclosureP2')}</p>
            <p>
              <strong>{t('privacyPolicy.notTrack')}</strong>
              <br />
              {t('privacyPolicy.notTrackDesc1')}
            </p>
            <p>{t('privacyPolicy.notTrackDesc2')}</p>
            <p>
              <strong>{t('privacyPolicy.storage')}</strong>
              <br />
              {t('privacyPolicy.storageDesc')}
            </p>
            <p>
              <strong>{t('privacyPolicy.retention')}</strong>
              <br />
              {t('privacyPolicy.retentionDesc')}
            </p>
            <p>
              <strong>{t('privacyPolicy.security')}</strong>
              <br />
              {t('privacyPolicy.securityDesc')}
            </p>
            <p>
              <strong>{t('privacyPolicy.noChildren')}</strong>
              <br />
              {t('privacyPolicy.noChildrenDesc')}
            </p>
            <p>
              <strong>{t('privacyPolicy.legalBasis')}</strong>
              <br />
              {t('privacyPolicy.legalBasisDesc')}
            </p>
            <p>
              <strong>{t('privacyPolicy.noDiscrim')}</strong>
              <br />
              {t('privacyPolicy.noDiscrimDesc')}
            </p>
            <p>
              <strong>{t('privacyPolicy.noFinancial')}</strong>
              <br />
              {t('privacyPolicy.noFinancialDesc')}
            </p>
            <p>
              <strong>{t('privacyPolicy.policyChange')}</strong>
              <br />
              {t('privacyPolicy.policyChangeDesc')}
            </p>
            <p>
              <strong>{t('privacyPolicy.contact')}</strong>
            </p>
            <p>{t('privacyPolicy.contactDesc')}</p>
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default PrivacyPolicy;
