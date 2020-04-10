import React from "react";
import { render } from "react-dom";
import App from "./views/researcher/fill-profile";
import PrimarySearchAppBar from "./components/appBar"
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"
import FooterMenu from "./components/Footer/FooterMenu"
import Theme from "./components/Theme"
import {  ThemeProvider } from '@material-ui/core/styles';

render(
    <React.StrictMode>
    <ThemeProvider theme={Theme}>
    
  
    <Navbar/>
    <App  />
    
    
    <Footer/>
    
    </ThemeProvider>
  </React.StrictMode>
    
    ,document.getElementById("root"));
