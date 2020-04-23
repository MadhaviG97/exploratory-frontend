import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Avatar from "@material-ui/core/Avatar";
import AddIcon from "@material-ui/icons/Add";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import photo1 from "../../assets/images/user-profile/faces/kendall.jpg";
import AnswerLikeSection from "../PublicForumSections/AnswerLikeSection";
import AddComment from "./addComment";

const messages = [
  {
    id: 10002,
    first_name: "malani",
    last_name: "fonseka",
    university: "University of Moratuwa",
    email: "melani@123.com",
    profile_picture: "avatar-2.jpg",
    message: "I'll be in the neighbourhood this week. Let's grab a bite to eat",
  },
  {
    id: 10003,
    first_name: "gamlath",
    last_name: "perera",
    university: "University of Moratuwa",
    email: "gamlath@123.com",
    profile_picture: "avatar-3.jpg",
    message:
      "Do you have a suggestion for a good present for John on his work anniversary. I am really confused & would love your thoughts on it.",
  },
];

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: "auto",
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
  },
}));

export default function CommentSection() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper square className={classes.paper}>
        <List className={classes.list}>
          {messages.map(
            ({ id, first_name, last_name, message, profile_picture }) => (
              <React.Fragment key={id}>
                {id === 1 && (
                  <ListSubheader className={classes.subheader}>
                    Today
                  </ListSubheader>
                )}
                {id === 3 && (
                  <ListSubheader className={classes.subheader}>
                    Last Week
                  </ListSubheader>
                )}
                <ListItem>
                  <ListItemAvatar>
                    <Avatar alt="Profile Picture" src={profile_picture} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={first_name.concat(last_name)}
                    secondary={message}
                  />
                  <AnswerLikeSection />
                  <ButtonGroup
                    color="primary"
                    aria-label="outlined primary button group"
                  >
                    <IconButton aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="edit">
                      <EditIcon />
                    </IconButton>
                  </ButtonGroup>
                </ListItem>
              </React.Fragment>
            )
          )}
        </List>
      </Paper>
      <AppBar position="relative" color="Primary" className={classes.appBar}>
        <Toolbar>
          <AddComment />
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
