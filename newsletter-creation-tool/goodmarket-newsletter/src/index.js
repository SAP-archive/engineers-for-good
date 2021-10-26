import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "@fontsource/noto-sans";

import { BrowserRouter, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import makeServer from "./server";

if (process.env.REACT_APP_ENV === "dev" && typeof makeServer === "function") {
  makeServer(); // For people following the tutorial
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <QueryParamProvider ReactRouterRoute={Route}>
      <App />
    </QueryParamProvider>
  </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();