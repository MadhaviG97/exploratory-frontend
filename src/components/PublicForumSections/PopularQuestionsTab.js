import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import { useDispatch, useSelector } from "react-redux";

import photo1 from "../../assets/images/user-profile/faces/christian.jpg";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "block",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    minHeight: 280
  },
}));

export default function PopularQuestionsTab() {
  const classes = useStyles();
  const forum = useSelector((state) => state.forum);
  const popularQuestions = useSelector((state) => state.forum.popularQuestions);
  const dispatch = useDispatch();

  function getLength(obj) {
    var length = 0;
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
        length++;
      }
    }
    return length;
  }

  return (
    <List className={classes.root}>
      <Divider variant="fullWidth" component="li" />
        {getLength(popularQuestions) > 0 ? (
        popularQuestions.map((question) => (
        <div>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt="Profile Picture"
                src={`data:image/jpeg;base64,${question.profile_picture}`}
              />
            </ListItemAvatar>
            <ListItemText
              primary={question.first_name + " " + question.last_name}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {question.title}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="fullWidth" component="li" />
        </div>
        ))
        ) : (
          <div>
            <ListItem>
              <div className={classes.paper} align="center">
                <Typography variant="h6" align="right" color="primary">
                  No questions yet...
                </Typography>
              </div>
            </ListItem>
          </div>
        )}
    </List>
  );
}
