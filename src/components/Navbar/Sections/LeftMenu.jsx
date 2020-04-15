import React from 'react';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
/* eslint-disable jsx-a11y/anchor-is-valid */

import Link from '@material-ui/core/Link';
import NavbarStyle from '../../../assets/css/NavbarStyle';

function LeftMenu(props) {//these ara the links in the left side of the nav bar
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const classes = NavbarStyle();
  return (
    <div >
      <Box display="flex" flexDirection="row" >
      <Box p={1}></Box>
          <Box p={3} bgcolor="background.paper">
            <Link
              className={classes.link}
              component="button"
              variant="body2"
              onClick={() => {
                console.info("I'm a button.");
              }}
            >
              Link 1
            </Link>
           
          </Box>
             
          <Box p={3} bgcolor="background.paper" >
            <Link
              className={classes.link}
              //onClick={handleClick}
              onMouseOver={handleClick}//if mouseover is too much can remove it from here
              aria-controls="simple-menu"
              aria-haspopup="true"
              >
                Link 2
            </Link>
          </Box>
          <Menu
            id="simple-menu"
            
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            MenuListProps={{ onMouseLeave: handleClose }}
          >
            <MenuItem style={{ color: '#000000',fontSize: 15 }} onClick={handleClose}>Link 1</MenuItem>
            <MenuItem style={{ color: '#000000',fontSize: 15 }} onClick={handleClose}>Link 2</MenuItem>
            <MenuItem style={{ color: '#000000',fontSize: 15 }} onClick={handleClose}>Link 3</MenuItem>
          </Menu>
          <Box p={3} bgcolor="background.paper" >
            <Link
              className={classes.link}
              //onClick={handleClick}
              onMouseOver={handleClick}//if mouseover is too much can remove it from here
              aria-controls="simple-menu"
              aria-haspopup="true"
              >
                Link 3
            </Link>
          </Box>
      </Box>
    </div>
  )
}

export default LeftMenu