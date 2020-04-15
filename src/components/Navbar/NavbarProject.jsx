import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Typography, Paper } from "@material-ui/core";

import NavbarStyle from "./NavbarStyle";
import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";

//the styles are from NavbarStyle
export default function Navbar(props) {
  const classes = NavbarStyle();
  return (
    <AppBar className={classes.appbar} position="static">
      <Toolbar>
        <img src="logo.png" alt="logo" className={classes.logo} />
        <LeftMenu />
        <Typography className={classes.title} variant="h6" noWrap></Typography>
        <RightMenu />
        <Paper />
      </Toolbar>
      {/* <Toolbar
          component="nav"
          variant="dense"
          className={classes.toolbarSecondary}
        >
          <Tab />
        </Toolbar> */}
    </AppBar>
  );
}
