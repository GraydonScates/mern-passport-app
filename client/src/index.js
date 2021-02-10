import React from 'react';
import { render } from 'react-dom';
import { StoreProvider } from './store';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();