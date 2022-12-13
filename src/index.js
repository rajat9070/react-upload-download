import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import Demo from './Demo';
import Upload from './Upload';
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Demo />
  </StrictMode>
);
