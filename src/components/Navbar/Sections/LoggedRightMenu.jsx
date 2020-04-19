import React from 'react';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import NavbarStyle from '../../../assets/css/NavbarStyle';
import Link from '@material-ui/core/Link';
import axios from 'axios';
import { Redirect, useHistory, useLocation } from "react-router-dom";
function LoggedRightMenu(props) {
//these ara the links in the left side of the nav bar
const classes = NavbarStyle();
const history = useHistory();
const logoutHandler = () => {
    const token = localStorage.token;
    
    let config = {
        headers: {
        'Authorization': `Bearer ${token}`
        }
      }
    localStorage.removeItem("token")
    axios.post(`/logout`,{},config).then(response => {
      if (response.status === 200) {
        history.push("/signin");
      } else {
        alert('Log Out Failed')
      }
    });
  };


return (
  <div>
    <Box display="flex" flexDirection="row" >
    <Box p={3} bgcolor="background.paper" >
            <Link
              className={classes.signin}
              component="button"
              variant="body2"
              onClick={logoutHandler}
              >
                SIGN OUT
            </Link>
          </Box>
    
    </Box>
  </div>
)}
export default LoggedRightMenu