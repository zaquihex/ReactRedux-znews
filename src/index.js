//React imports
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

//Redux imports
import { Provider } from "react-redux";
import { LocalizeProvider } from "react-localize-redux";

//store and service imports
import configureStore from "./store/store";
import * as serviceWorker from "./serviceWorker";

//component imports
import App from "./App.jsx";

//style
import "./index.css";

const app = (
  <Provider store={configureStore()}>
    <LocalizeProvider store={configureStore()}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LocalizeProvider>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
