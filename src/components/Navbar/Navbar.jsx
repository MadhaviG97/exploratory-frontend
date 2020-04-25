import React from "react";

import styles from "../../assets/jss/material-kit-react/views/componentsSections/navbarsStyle";

import LeftMenu from "./Sections/LeftMenu";
import RightMenu from "./Sections/RightMenu";
import LoggedRightMenu from "./Sections/LoggedRightMenu";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import Header from "../Header/Header.js";
import Button from "../CustomButtons/Button.js";
import Tab from "../Project/TabPrivateMode";

const useStyles = makeStyles(styles);
//the styles are from NavbarStyle
export default function Navbar(props) {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const [show, setShow] = React.useState(false);

  const handleShowNotification = (show) => {
    setShow(!show);
    console.log(show);
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <div className={classes.root}>
        <Header
          logo="/logo1.png"
          brand="Exploratory"
          leftLinks={<LeftMenu />}
          rightLinks={<RightMenu />}
        />
      </div>
    );
  } else if (user.userData && user.userData.isAuth) {
    /* this nested elif is used to handle the sitaution when user.userData is null */
    return (
      <div className={classes.root}>
        <Header
          logo="/logo1.png"
          brand="Exploratory"
          leftLinks={<LeftMenu />}
          rightLinks={
            <LoggedRightMenu
              onShowNotification={() => handleShowNotification(show)}
            />
          }
        />
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <Header
          logo="/logo1.png"
          brand="Exploratory"
          leftLinks={<LeftMenu />}
          rightLinks={<RightMenu />}
        />
      </div>
    );
  }
}
