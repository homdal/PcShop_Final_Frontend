import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./store/store";

axios.defaults.baseURL = "https://pcshop-backend.onrender.com/api/v1";
axios.interceptors.request.use((config) => {
  const tokenLocal = localStorage.getItem("token");
  const tokenSession = sessionStorage.getItem("token");
  if (tokenLocal) {
    config.headers["Authorization"] = `bearer ${tokenLocal}`;
  } else if (tokenSession) {
    config.headers["Authorization"] = `bearer ${tokenSession}`;
  } else {
    config.headers[
      "Authorization"
    ] = `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWMwYzAzZWI5OWZiN2Y0YzczM2YwZDUiLCJpYXQiOjE3MDg3NzIxNDR9.NNngkOhETWzAwYlYKbuNym0kU64IziznvzGcbpHwgaI`;
  }
  return config;
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter basename="/PcShop_Final_Frontend">
      <App />
    </BrowserRouter>
  </Provider>
);
