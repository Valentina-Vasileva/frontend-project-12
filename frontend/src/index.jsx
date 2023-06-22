import React from 'react';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import { Provider } from 'react-redux';
import wordFilter from 'leo-profanity';
import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react';
import App from './components/App.jsx';
import resources from './locales/index.js';
import store from './slices/index.js';
import rollbarConfig from './config/rollbar.js';

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
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <App />
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
