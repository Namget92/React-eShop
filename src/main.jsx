import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { RecoilRoot } from "recoil";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
