import React from "react";
import { render } from "react-dom";
import App from "./views/researcher/fill-profile";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Theme from "./assets/themes/Theme";
import { ThemeProvider } from "@material-ui/core/styles";

render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <Navbar />
      <main>
        <App />
      </main>
      <Footer />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
