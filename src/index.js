import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./redux/store";
import axios from "axios";
import dotenv from "dotenv";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
//import './index.css';
import reportWebVitals from "./reportWebVitals";

dotenv.config();

//el Provider le permite a toda la App conocer sobre la existencia del store

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
