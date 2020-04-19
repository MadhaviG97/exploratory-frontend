import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Typography, Paper } from "@material-ui/core";

import NavbarStyle from "./NavbarStyle";
import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";

import Tab from "../Tab";

//the styles are from NavbarStyle
export default function Navbar(props) {
  const classes = NavbarStyle();

  const handleShowNotification = (e) => {
    console.log("test2");
  };
  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="sticky">
        <Toolbar>
          <a href="/">
            <img src="logo.png" alt="logo" className={classes.logo} />
          </a>
          <LeftMenu />
          <Typography
            className={classes.title}
            variant="h6"
            noWrap
          ></Typography>
          <RightMenu showNotification={handleShowNotification} />
          <Paper />
        </Toolbar>
      </AppBar>
    </div>
  );
}
