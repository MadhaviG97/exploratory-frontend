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
import Badge from "@material-ui/core/Badge";
import StarsIcon from "@material-ui/icons/Stars";
import { Link } from "react-router-dom";
import LinkTo from "@material-ui/core/Link";

import AnswerLike from "./AddALike";
import AddComment from "./AddComment";
import AnswerLikeSection from "./AnswerLikeSection";
import DeleteAnswer from "./AnswerDeleteDialog";
import EditAnswer from "./EditAnswerDialog";

import { useDispatch, useSelector } from "react-redux";
import { getAnswers } from "../../_actions/forum_actions";
import EdtAnswer from "./EditAnswerDialog";

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
  const is_logged = useSelector((state) => state.is_logged);
  const forum = useSelector((state) => state.forum);
  const user = useSelector((state) => state.user);
  const answerLikes = useSelector((state) => state.forum.answerLikes);
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper square className={classes.paper}>
        <Typography className={classes.text} variant="h5" gutterBottom>
          Answers
        </Typography>
        {is_logged ? (
          <List className={classes.list}>
            {forum.answers.map((answer) =>
              props.question_id === answer.question_id ? (
                <React.Fragment key={answer.question_id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar
                        alt="Profile Picture"
                        src={answer.profile_picture}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Link
                          to={`/userprofile/${answer.researcher_id}`}
                          style={{ color: "primary" }}
                        >
                          <LinkTo component="h5">
                            {answer.first_name + " " + answer.last_name}
                          </LinkTo>
                        </Link>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="inherit"
                          >
                            {new Date(answer.updated_at).toDateString() +
                              " :- "}
                          </Typography>
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
                    {answer.like_count > 0 ? (
                      <div className={classes.star}>
                        <Badge color="primary" badgeContent={answer.like_count}>
                          <StarsIcon fontSize="medium" color="primary" />
                        </Badge>
                      </div>
                    ) : (
                      <div className={classes.star}>
                        <StarsIcon fontSize="medium" color="primary" />
                      </div>
                    )}
                    <AnswerLikeSection answer={answer} />
                    {/* <AnswerLike
                      question_id={answer.question_id}
                      answer_id={answer.answer_id}
                    />
                    {answer.researcher_id === user.userData._id ? (
                      <ButtonGroup
                        color="primary"
                        aria-label="outlined primary button group"
                      >
                        <DeleteAnswer answer_id={answer.answer_id} />
                        <EditAnswer
                          answer={answer.answer}
                          answer_id={answer.answer_id}
                        />
                      </ButtonGroup>
                    ) : (
                      <div></div>
                    )} */}
                  </ListItem>
                </React.Fragment>
              ) : (
                <div></div>
              )
            )}
          </List>
        ) : (
          <List className={classes.list}>
            {forum.answers.map((answer) =>
              props.question_id === answer.question_id ? (
                <React.Fragment key={answer.question_id}>
                  <ListItem>
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
                            variant="body2"
                            className={classes.inline}
                            color="inherit"
                          >
                            {new Date(answer.updated_at).toDateString() +
                              " :- "}
                          </Typography>
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
                    {answer.like_count > 0 ? (
                      <div className={classes.star}>
                        <Badge color="primary" badgeContent={answer.like_count}>
                          <StarsIcon fontSize="medium" color="primary" />
                        </Badge>
                      </div>
                    ) : (
                      <div className={classes.star}>
                        <StarsIcon fontSize="medium" color="primary" />
                      </div>
                    )}
                  </ListItem>
                </React.Fragment>
              ) : (
                <div></div>
              )
            )}
          </List>
        )}
      </Paper>
      <AppBar position="relative" color="Primary" className={classes.appBar}>
        <Toolbar>
          {is_logged ? (
            <AddComment
              question_title={props.question_title}
              question_id={props.question_id}
            />
          ) : (
            <div></div>
          )}

          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
