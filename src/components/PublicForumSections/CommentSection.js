import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import AnswerLikeSection from "./AnswerLikeSection";
import AddComment from "./AddComment";
import DeleteAnswer from "./AnswerDeleteDialog";

import { useDispatch, useSelector } from "react-redux";
import { getAnswers } from "../../_actions/forum_actions";

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

export default function CommentSection(props) {
  const classes = useStyles();
  const forum = useSelector((state) => state.forum);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAnswers());
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper square className={classes.paper}>
        <Typography className={classes.text} variant="h5" gutterBottom>
          Answers
        </Typography>
        <List className={classes.list}>
          {forum.answers.map((answer) =>
            props.question_id === answer.question_id ? (
              <React.Fragment key={answer.question_id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      alt="Profile Picture"
                      src={`data:image/jpeg;base64,${answer.profile_picture}`}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={answer.first_name + " " + answer.last_name}
                    secondary={answer.answer}
                  />
                  <AnswerLikeSection />
                  {answer.researcher_id === user.userData._id ? (
                    <ButtonGroup
                      color="primary"
                      aria-label="outlined primary button group"
                    >
                      <DeleteAnswer answer_id={answer.answer_id} />
                      <IconButton aria-label="edit">
                        <EditIcon />
                      </IconButton>
                    </ButtonGroup>
                  ) : (
                    <div></div>
                  )}
                </ListItem>
              </React.Fragment>
            ) : (
              <div></div>
            )
          )}
        </List>
      </Paper>
      <AppBar position="relative" color="Primary" className={classes.appBar}>
        <Toolbar>
          <AddComment
            question_title={props.question_title}
            question_id={props.question_id}
          />
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
