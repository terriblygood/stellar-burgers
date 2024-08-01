import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './services/store';
import './index.css';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOMClient.createRoot(container!);
console.log(process.env.BURGER_API_URL, '111');
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
