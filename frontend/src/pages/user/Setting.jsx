import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import DarkModeToggle from '../../components/DarkModeToggle';
import LanguageSelector from '../../components/LanguageSelector';

function Setting() {
  const { t } = useTranslation();
  
  return (
    <Container>
      <h2 className="mb-4">{t('settings.title')}</h2>
      
      <Row>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Header>
              <h5>{t('settings.appearance')}</h5>
            </Card.Header>
            <Card.Body className="d-flex align-items-center justify-content-between">
              <div>
                <h6>{t('common.darkMode')}</h6>
                <p className="text-muted mb-0">{t('settings.darkModeDescription')}</p>
              </div>
              <DarkModeToggle />
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} className="mb-4">
          <Card>
            <Card.Header>
              <h5>{t('settings.language')}</h5>
            </Card.Header>
            <Card.Body className="d-flex align-items-center justify-content-between">
              <div>
                <h6>{t('settings.language')}</h6>
                <p className="text-muted mb-0">{t('settings.languageDescription')}</p>
              </div>
              <LanguageSelector />
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} className="mb-4">
          <Card>
            <Card.Header>
              <h5>{t('settings.notifications')}</h5>
            </Card.Header>
            <Card.Body>
              <div>
                <h6>{t('settings.notifications')}</h6>
                <p className="text-muted mb-0">{t('settings.notificationsDescription')}</p>
              </div>
              {/* Add notification settings here */}
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} className="mb-4">
          <Card>
            <Card.Header>
              <h5>{t('settings.privacy')}</h5>
            </Card.Header>
            <Card.Body>
              <div>
                <h6>{t('settings.privacy')}</h6>
                <p className="text-muted mb-0">{t('settings.privacyDescription')}</p>
              </div>
              {/* Add privacy settings here */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Setting;