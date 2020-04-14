import React from 'react';
import { render } from "react-dom";
import App from "./App";
import Theme from "./assets/themes/Theme";
import { ThemeProvider } from "@material-ui/core/styles";

import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";

render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
