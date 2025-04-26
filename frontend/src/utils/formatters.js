import { format } from 'date-fns';
import { enUS, vi, zhCN } from 'date-fns/locale';
import i18next from 'i18next';

const locales = {
  en: enUS,
  vi: vi,
  zh: zhCN
};

export const formatDate = (date, formatStr = 'PPP') => {
  const locale = locales[i18next.language] || enUS;
  return format(new Date(date), formatStr, { locale });
};

export const formatCurrency = (amount, currencyCode = 'USD') => {
  const language = i18next.language;
  
  const currencyByLanguage = {
    en: 'USD',
    vi: 'VND',
    zh: 'CNY'
  };
  
  const finalCurrencyCode = currencyCode || currencyByLanguage[language] || 'USD';
  
  return new Intl.NumberFormat(language, {
    style: 'currency',
    currency: finalCurrencyCode
  }).format(amount);
};