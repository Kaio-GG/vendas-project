import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Roteador from './router.js';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer/>
    <Roteador/>
  </React.StrictMode>
);

