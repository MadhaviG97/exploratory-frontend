import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import base64Img from "base64-img";

import WorkIcon from "@material-ui/icons/Work";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import DescriptionIcon from "@material-ui/icons/Description";

import NavBar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer.jsx";
import TabPanel from "../../components/UserProfileSections/TabBarSection";
import EditProfile from "../../components/UserProfileSections/EditProfileDialog";
import profile from "../../assets/images/user-profile/faces/user_profile_default.jpg";

import { getProfile, getProjectsByUserId } from "../../_actions/user_profile";

import { useDispatch, useSelector } from "react-redux";
import { id } from "date-fns/locale";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  userSection: {
    minHeight: "100%",
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  paperPhoto: {
    padding: theme.spacing(0),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  paperDetails: {
    padding: theme.spacing(3),
    textAlign: "center",
    color:theme.palette.text.secondary,
    backgroundColor: "#E6E6E6",
  },
  profileImage: {
    width: 150,
    height: 150,
    padding: 2,
  },
  input: {
    display: "none",
  },
  textRoot: {
    textAlign: "justify",
  },
  buttonEdit: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));

export default function UserProfile() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [linkedInVal, setLinkedInVal] = React.useState(false);
  const [twitterVal, setTwitterVal] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const userData = useSelector((state) => state.user.userData);
  const { uId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile(uId));
    dispatch(getProjectsByUserId(uId));
  }, []);
  const researcherData = useSelector(
    (state) => state.researcher.researcherData
  );

  var researcher = {};
  var user = {};

  for (var key in researcherData) {
    if (researcherData.hasOwnProperty(key)) {
      researcher[key] = researcherData[key];
    }
  }

  for (var key in userData) {
    if (userData.hasOwnProperty(key)) {
      user[key] = userData[key];
    }
  }

  let profile_picture = "";
  let contact_no = "";
  let institution = "";
  let profession = "";
  let description = "";
  let linkedIn = "";
  let twitter = "";

  if (researcher.contact_no) {
    contact_no = researcher.contact_no;
  }
  if (researcher.profile_picture) {
    profile_picture = `data:image/jpeg;base64,${researcher.profile_picture}`;
  }
  if (researcher.institution) {
    institution = researcher.institution;
  }
  if (researcher.profession) {
    profession = researcher.profession;
  }
  if (researcher.description) {
    description = researcher.description;
  }
  if (researcher.linkedIn) {
    linkedIn = researcher.linkedIn;
  }
  if (researcher.twitter) {
    twitter = researcher.twitter;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fileSelectedHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  console.log(selectedFile);

  // const fileUploadHandler = () => {
  //   var data = base64Img.base64Sync(selectedFile.name);
  //   console.log(data);
  // }

  return (
    <div className={classes.root}>
      <NavBar />
      <Grid className={classes.userSection} container spacing={0}>
        <Grid item xs={4}>
          <Container style={{ backgroundColor: "#222297", padding: "2px" }}>
            <Paper className={classes.paper}>
              <Paper className={classes.paperPhoto}>
                <div className={classes.paper}>
                  {researcher.profile_picture ? (
                    <img
                      src={profile_picture}
                      alt="profile photo"
                      className={classes.profileImage}
                    />
                  ) : (
                    <img
                      src={profile}
                      alt="profile photo"
                      className={classes.profileImage}
                    />
                  )}
                </div>
                <div className={classes.paper}>
                  {researcher.id == user._id ? (
                    <div>
                      <input
                        accept="image/*"
                        className={classes.input}
                        id="icon-button-file"
                        type="file"
                        onChange={fileSelectedHandler}
                      />
                      <label htmlFor="icon-button-file">
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                          //onClick={fileUploadHandler}
                        >
                          <PhotoCamera />
                        </IconButton>
                      </label>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <Typography variant="h5" color="primary" gutterBottom>
                    {researcher.first_name} {researcher.last_name}
                  </Typography>
                  <Typography variant="body2" color="inherit" gutterBottom>
                    {profession}
                  </Typography>
                  <div className={classes.paper}>
                    <IconButton
                      aria-label="LinkedIn"
                      href={linkedIn}
                      color="primary"
                    >
                      <LinkedInIcon />
                    </IconButton>
                    <IconButton
                      aria-label="Twitter"
                      href={twitter}
                      color="primary"
                    >
                      <TwitterIcon color="primary" />
                    </IconButton>
                  </div>
                </div>
              </Paper>
              <Paper className={classes.paperDetails}>
                <div>
                  <List className={classes.root}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <EmailIcon color="primary" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Email"
                        secondary={researcher.email}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <PhoneIcon color="primary" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Contact Number"
                        secondary={contact_no}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <WorkIcon color="primary" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Institution"
                        secondary={institution}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <DescriptionIcon color="primary" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary="Personal Description"
                        secondary={description}
                        className={classes.textRoot}
                      />
                    </ListItem>
                  </List>
                </div>
              </Paper>
              {researcher.id == user._id ? (
                <div className={classes.buttonEdit}>
                  <EditProfile profileDetails={researcher} />
                </div>
              ) : (
                <div></div>
              )}
            </Paper>
          </Container>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            <TabPanel />
          </Paper>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}
