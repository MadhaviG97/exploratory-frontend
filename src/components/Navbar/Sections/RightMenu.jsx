import React from 'react';
import Box from '@material-ui/core/Box';


import NavbarStyle from '../../../assets/css/NavbarStyle';
import Link from '@material-ui/core/Link';
import styles from "../../../assets/jss/material-kit-react/views/componentsSections/navbarsStyle";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import Button from "../../CustomButtons/Button.js";
const useStyles = makeStyles(styles);
function RightMenu(props) {
//these ara the links in the left side of the nav bar
const classes = useStyles();

return (
  
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <Button
            href="/signin"
            className={classes.navLinkHeader}
            
            color="transparent"
          >
            Sign in
          </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Button
            href="/signup"
            className={classes.signinLink}
            
            color="themeBlue"
            round
          >
            Join for Free
          </Button>
        </ListItem>
      </List>
  
)}
export default RightMenu