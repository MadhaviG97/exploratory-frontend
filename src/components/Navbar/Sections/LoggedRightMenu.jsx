import React from 'react';
import Box from '@material-ui/core/Box';


import NavbarStyle from '../../../assets/css/NavbarStyle';

import styles from "../../../assets/jss/material-kit-react/views/componentsSections/navbarsStyle";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import NotificationsIcon from '@material-ui/icons/Notifications';
import Button from "../../CustomButtons/Button.js";
import CustomDropdown from "../../CustomDropdown/CustomDropdown.js";
import { Redirect, useHistory, useLocation } from "react-router-dom";

import axios from'axios';
import { Link } from "react-router-dom";
import LinkTo from '@material-ui/core/Link';
import { useSelector } from "react-redux";
import { Typography } from '@material-ui/core';
const useStyles = makeStyles(styles);

function LoggedRightMenu(props) {

  const classes = useStyles();
  const history = useHistory();
  const user = useSelector(state => state.user)
  let profileImage=process.env.PUBLIC_URL + '/images/profile-pictures/profilePic.png'
  if (user.userData.profile_picture){
    profileImage=user.userData.profile_picture
  }
  //console.log(user)
  const name=user.userData.first_name;
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
    
      <List className={classes.list}>
          <ListItem className={classes.listItem}>
            <Button
              justIcon
              round
              href="#pablo"
              className={classes.notificationNavLink}
              onClick={e => e.preventDefault()}
              color="rose"
            >
              <NotificationsIcon className={classes.icons} />
            </Button>
          </ListItem>
          <ListItem className={classes.listItem}>
            <CustomDropdown
              left
              caret={false}
              hoverColor="themeBlue"
              imgText={
                <div
                  className={classes.imageLink}
                  color="transparent"
                >
              {name}
            </div>
              }
              caret={true}
              buttonText={
                <img
                  src={profileImage}
                  className={classes.img}
                  alt="profile"
                />
                
              }
              buttonProps={{
                className:
                  classes.navLink + " " + classes.imageDropdownButton,
                color: "transparent"
              }}
              
              dropdownList={[
                <Link to="/#" style={{ color: 'inherit' }}>
                  <LinkTo  
                    component="button"
                  >
                    My Profile
                  </LinkTo>
                  
                </Link>,
                <Link to="/#" style={{ color: 'inherit' }}>
                  <LinkTo  
                    component="button"
                  >
                    My Projects
                  </LinkTo>
              </Link>,
                <LinkTo
                  
                  component="button"
                  color='inherit'
                  onClick={logoutHandler}
                  >
                  Sign out
                </LinkTo>
              ]}
            />
          </ListItem>
        </List>
    
)}
export default LoggedRightMenu