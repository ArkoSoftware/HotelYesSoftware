import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./App.css";
import NavProvider from "./contexts/NavProvider";

ReactDOM.render(
  <NavProvider>
    <App />
  </NavProvider>,
  document.getElementById("root")
);
