import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {LanguageProvider} from './i18n';
import './index.css';
import {migrateStorage} from './storage';

// Upgrade progress saved by an older version before any component reads it.
migrateStorage();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
);
