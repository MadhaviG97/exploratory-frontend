import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Typography, Paper } from "@material-ui/core";

import styles from "../../assets/jss/material-kit-react/views/componentsSections/navbarsStyle";

import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";
import LoggedRightMenu from "./Sections/LoggedRightMenu";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Header from "../Header/Header.js";
import Button from "../CustomButtons/Button.js";
import Tab from "../Tab";

const useStyles = makeStyles(styles);
//the styles are from NavbarStyle
export default function Navbar(props) {

  const classes = useStyles();
  const user = useSelector(state => state.user)
  
  if (user.userData && !user.userData.isAuth) {
    return (
      <div className={classes.root}>
        <Header
        logo="/logo1.png"
            brand="Exploratory"
            leftLinks={
              <LeftMenu/>
            }
            rightLinks={
              <RightMenu/>
            }
          />
      </div>
    );
  }
  
  /* this nested elif is used to handle the sitaution when user.userData is null */
  else if(user.userData && user.userData.isAuth){
    return (
      <div className={classes.root}>
        <Header
        logo="/logo1.png"
            brand="Exploratory"
            leftLinks={
              <LeftMenu/>
            }
            rightLinks={
              <LoggedRightMenu/>
            }
          />
      </div>
    );
  }
  else{
    return (
      <div className={classes.root}>
        <Header
        logo="/logo1.png"
            brand="Exploratory"
            leftLinks={
              <LeftMenu/>
            }
            rightLinks={
              <RightMenu/>
            }
          />
      </div>
    );
  }

  

}
