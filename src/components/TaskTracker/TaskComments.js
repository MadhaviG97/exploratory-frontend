import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import EditComment from "./EditComment";
import AddComment from "./AddNewComment";
import DeleteComment from "./DeleteComment";

import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../_actions/taskTracker_actions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    maxWidth: "auto",
    backgroundColor: "#f5f5f5",
  },
  inline: {
    display: "inline",
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  title: {
    padding: theme.spacing(2),
  },
  commentButton: {
    flexDirection: "row",
    alignItems: "left",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function TaskComments(props) {
  const classes = useStyles();
  const pId = props.project_id;
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getComments(pId));
  }, []);
  const tasktracker = useSelector((state) => state.task_tracker);

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
    <Paper className={classes.root}>
      <Paper className={classes.root}>
        <Typography className={classes.title} variant="h5" color="primary">
          Comments
        </Typography>
      </Paper>
      <List className={classes.root}>
        {getLength(tasktracker.comments) > 0 ? (
          tasktracker.comments.map((comment) => (
            <div>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt={comment.first_name + " " + comment.last_name}
                    src={`data:image/jpeg;base64,${comment.profile_picture}`}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={comment.first_name + " " + comment.last_name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="inherit"
                      >
                        {new Date(comment.updated_at).toDateString() + " :- "}
                      </Typography>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {comment.comment}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>

              {comment.commentor_id == user.userData._id ? (
                <div>
                  <ButtonGroup
                    className={classes.commentButton}
                    variant="contained"
                    color="primary"
                    aria-label="contained primary button group"
                  >
                    <EditComment comment_id={comment.comment_id} project_id={pId} comment={comment.comment}/>
                    <DeleteComment comment_id={comment.comment_id} project_id={pId} />
                  </ButtonGroup>

                  
                </div>
                
              ) : (
                <div></div>
              )}
              
              <Divider variant="fullWidth" component="li" />
            </div>
          ))
        ) : (
          <ListItem>
            <div className={classes.paper} align="center">
              <Typography variant="h6" align="right" color="primary">
                No Comments
              </Typography>
            </div>
          </ListItem>
        )}
      </List>
      <div className={classes.paper}>
        <AddComment project_id={pId} />
      </div>
    </Paper>
  );
}
