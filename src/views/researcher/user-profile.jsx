import React from "react";
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
import Container from '@material-ui/core/Container';

import WorkIcon from "@material-ui/icons/Work";
import EmailIcon from "@material-ui/icons/Email";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import DescriptionIcon from "@material-ui/icons/Description";

import NavBar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer.jsx";
import TabPanel from "../../components/UserProfileSections/TabBarSection";
import EditProfile from "../../components/UserProfileSections/EditProfileDialog";
import profile from "../../assets/images/user-profile/faces/marc.jpg";

import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
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
}));

export default function CenteredGrid() {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const [value, setValue] = React.useState(0);

 
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  return (
    <div className={classes.root}>
      <NavBar />
      <Grid container spacing={0}>
        <Grid item xs={4}>
          <Container style={{backgroundColor: '#222297', padding:'2px'}}>
          <Paper className={classes.paper}  >
            <div className={classes.paper}>
              <img
                src={`data:image/jpeg;base64,${user.userData.profile_picture}`}
                alt="profile photo"
                className={classes.profileImage}
              />
            </div>
            <div className={classes.paper}>
              <div>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="icon-button-file"
                  type="file"
                />
                <label htmlFor="icon-button-file">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </div>
              <Typography variant="h5" color="primary" gutterBottom>
                {user.userData.first_name} {user.userData.last_name}
              </Typography>
              <Typography variant="body2" color="inherit" gutterBottom>
              {user.userData.profession}
              </Typography>
              <div className={classes.paper}>
                <IconButton aria-label="LinkedIn" href={user.userData.linkedIn} color="primary">
                  <LinkedInIcon />
                </IconButton>
                <IconButton aria-label="Twitter" href={user.userData.twitter} color="primary">
                  <TwitterIcon color="primary" />
                </IconButton>
              </div>
            </div>
            <div>
              <List className={classes.root}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <EmailIcon color="primary" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Email" secondary={user.userData.email} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <DescriptionIcon color="primary" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Personal Description"
                    secondary={user.userData.description}
                    className={classes.textRoot}
                  />
                </ListItem>
              </List>
            </div>
            <div className={classes.root}>
              <EditProfile profileDetails = {user.userData}/>
            </div>
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
