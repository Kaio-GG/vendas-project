import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Roteador from './router.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Roteador />
  </React.StrictMode>
);

