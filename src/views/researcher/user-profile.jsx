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
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <NavBar />
      <Grid container spacing={0}>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <div className={classes.paper}>
              <img
                src={profile}
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
                Christian Ferdinand
              </Typography>
              <Typography variant="body2" color="inherit" gutterBottom>
                Programmer
              </Typography>
              <div className={classes.paper}>
                <IconButton aria-label="LinkedIn" href="" color="primary">
                  <LinkedInIcon />
                </IconButton>
                <IconButton aria-label="Twitter" href="" color="primary">
                  <TwitterIcon color="primary" />
                </IconButton>
              </div>
            </div>
            <div>
              <List className={classes.root}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <WorkIcon color="primary" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Institute"
                    secondary="University of Moratuwa"
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <EmailIcon color="primary" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Email" secondary="christian@uom.lk" />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <DescriptionIcon color="primary" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary="Personal Description"
                    secondary="Directed art history research on famous artists utilizing major
                museums and libraries across the United States, Germany, France
                and England. Worked in Paris to instruct business professional
                on the English language to enhance presentations and
                correspondence. Utilized bilingual ability to create, prepare
                and implement language lesson plans for young children up to
                adults. Chosen for prestigious internship program at one of the
                top museums in the world. Taught French class at U.S. university
                and received letter of recommendation. Assisted with the process
                of evaluating, cataloging and indexing collections for the
                institution. Researched artist for exhibit-related educational
                program. Conducted several presentations son influential artists
                at the University of Paris."
                    className={classes.textRoot}
                  />
                </ListItem>
              </List>
            </div>
            <div className={classes.root}>
              <EditProfile />
            </div>
          </Paper>
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
