
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';

import NavbarStyle from '../../assets/css/NavbarStyle';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import WindowResize from '../WindowResize';
import MenuIcon from "@material-ui/icons/Menu";

//the styles are from NavbarStyle
export default function Navbar(props) {
  const classes = NavbarStyle();
  return (
    <div className={classes.root}>
      {!WindowResize()[0].matches && (
        <AppBar className={classes.appbarShrink}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <img src="/logo.png" alt="logo" className={classes.logoShrink} />
          
          </Toolbar>
        </AppBar>
      )}
      {WindowResize()[0].matches && (
        <AppBar className={classes.appbar}>
          <Toolbar>
          <img src="/logo.png" alt="logo" className={classes.logo} />
        
          <LeftMenu/>
          
          <Typography className={classes.title} variant="h6" noWrap>
            
          </Typography>
        
          <RightMenu/>
        
        </Toolbar>
      </AppBar>
      )}
    </div>
  );


}



