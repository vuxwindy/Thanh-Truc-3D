import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LanguageRedirect = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Check if URL contains language parameter
    const params = new URLSearchParams(location.search);
    const langParam = params.get('lang');
    
    if (langParam && ['en', 'vi', 'zh'].includes(langParam)) {
      // If URL has valid language parameter, set it
      if (langParam !== i18n.language) {
        i18n.changeLanguage(langParam);
      }
      
      // Remove the lang parameter from URL
      params.delete('lang');
      const newSearch = params.toString();
      const newPath = location.pathname + (newSearch ? `?${newSearch}` : '');
      navigate(newPath, { replace: true });
    }
  }, [location, i18n, navigate]);
  
  return null; // This is a utility component, it doesn't render anything
};

export default LanguageRedirect;