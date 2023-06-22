import React from 'react';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import { Provider } from 'react-redux';
import wordFilter from 'leo-profanity';
import App from './components/App.jsx';
import resources from './locales/index.js';
import store from './slices/index.js';

const init = async () => {
  await i18n
    .use(initReactI18next)
    .init({
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
      resources,
    });

  wordFilter.add(wordFilter.getDictionary('ru'));

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default init;
