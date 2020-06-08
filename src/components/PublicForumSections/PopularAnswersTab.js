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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
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
  const popularAnswers = useSelector((state) => state.forum.popularAnswers);
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
        {getLength(popularAnswers) > 0 ? (
        popularAnswers.map((answer) => (
        <div>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt="Profile Picture"
                src={answer.profile_picture}
              />
            </ListItemAvatar>
            <ListItemText
              primary={answer.first_name + " " + answer.last_name}
              secondary={
                <React.Fragment>
                  <Typography

                    component="span"
                    variant="inherit"
                    color="initial"
                    className={classes.inline}
                    align="inherit"
                  >
                    {answer.question}
                  </Typography>
                  <br />
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {answer.answer}
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
                  No answers yet...
                </Typography>
              </div>
            </ListItem>
          </div>
        )}
    </List>
  );
}
