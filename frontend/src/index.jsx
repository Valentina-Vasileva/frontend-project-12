import React from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import resources from './locales/index.js';
import store from './slices/index.js';
import AuthProvider from './context/AuthProvider';

const init = async () => {
  await i18n
    .use(initReactI18next)
    .init({
      fallbackLng: 'ru',
      resources,
    });

  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Provider>
    </I18nextProvider>
  );
};

export default init;
