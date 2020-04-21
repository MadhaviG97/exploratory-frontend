import React from "react";


import styles from "../../assets/jss/material-kit-react/views/componentsSections/navbarsStyle";

import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";
import LoggedRightMenu from "./Sections/LoggedRightMenu";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import Header from "../Header/Header.js";


const useStyles = makeStyles(styles);
//the styles are from NavbarStyle
export default function Navbar(props) {

  const classes = useStyles();
  const user = useSelector(state => state.user)
  
  if (user.userData && !user.userData.isAuth) {
    return (
      <div className={classes.root}>
        <Header
            fixed="sticky"
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
  }/* this is until the page loads */
  else{
    return (
      <div className={classes.root}>
        <Header
            logo="/logo1.png"
            brand="Exploratory"
            leftLinks={
              <LeftMenu/>
            }
            
          />
      </div>
    );
  }

  

}
