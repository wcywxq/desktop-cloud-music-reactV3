import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import store from "./store";
import App from "./App";
import BasicLayout from "./layouts/BaiscLayout";
import "./index.scss";

ReactDOM.render(
  <Provider {...store}>
    {/* <App /> */}
    <BasicLayout />
  </Provider>,
  document.getElementById("root")
);
