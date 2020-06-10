import React from "react";

import styles from "../../../assets/jss/material-kit-react/views/componentsSections/navbarsStyle";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { useSelector } from "react-redux";

import Button from "../../CustomButtons/Button.js";
const useStyles = makeStyles(styles);

function LeftMenu(props) {
  //these ara the links in the left side of the nav bar
  const user = useSelector((state) => state.user);
  const classes = useStyles();

  return (
    <div>
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <Button href="/" className={classes.navLink} color="transparent">
            Home
          </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Button
            href="/aboutus"
            className={classes.navLink}
            color="transparent"
          >
            About Us
          </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Button href="/forum" className={classes.navLink} color="transparent">
            Forum
          </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Button
            href={
              user.userData && user.userData.isAuth
                ? "/project/createproject"
                : "/signin"
            }
            className={classes.navLink}
            color="transparent"
          >
            Create Project
          </Button>
        </ListItem>
      </List>
    </div>
  );
}

export default LeftMenu;
