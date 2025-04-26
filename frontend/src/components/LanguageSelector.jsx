import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FaGlobe } from 'react-icons/fa';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const getLanguageName = (code) => {
    switch(code) {
      case 'en': return ' ';
      case 'vi': return ' ';
      case 'zh': return ' ';
      default: return code;
    }
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="link" id="language-dropdown" className="text-decoration-none">
        <FaGlobe className="me-1" /> {getLanguageName(i18n.language)}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => changeLanguage('en')}>English</Dropdown.Item>
        <Dropdown.Item onClick={() => changeLanguage('vi')}>Tiếng Việt</Dropdown.Item>
        <Dropdown.Item onClick={() => changeLanguage('zh')}>中文</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageSelector;