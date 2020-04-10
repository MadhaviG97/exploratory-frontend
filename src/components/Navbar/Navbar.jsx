
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';

import NavbarStyle from './NavbarStyle';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';



//the styles are from NavbarStyle
export default function Navbar(props) {
  const classes = NavbarStyle();
  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar}>
        <Toolbar>
        <img src="logo.png" alt="logo" className={classes.logo} />
          <LeftMenu/>
          <Typography className={classes.title} variant="h6" noWrap>
            
          </Typography>
          <RightMenu/>
          
        </Toolbar>
      </AppBar>
    </div>
  );


}



