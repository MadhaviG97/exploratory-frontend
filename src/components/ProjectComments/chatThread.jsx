import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Avatar from "@material-ui/core/Avatar";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { useSelector } from "react-redux";
import AnswerLikeSection from "../PublicForumSections/AnswerLikeSection";
import AnswerDislikeSection from "../PublicForumSections/AnswerDislikeSection";

import AddReply from "./AddReply";
import EditReply from "./EditReply";
import DeleteReply from "./DeleteReply";

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
  const user = useSelector((state) => state.user);
  const project = useSelector((state) => state.project);

  const isDeletable = (authur_id) => {
    if (authur_id === user.userData._id) {
      return true;
    }
    var collaborator;
    for (collaborator of project.collaborators) {
      if (user.userData._id === collaborator.researcher_id) {
        return true;
      }
    }
    return false;
  };

  const isEditable = (authur_id) => {
    return authur_id === user.userData._id ? true : false;
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper square className={classes.paper}>
        <List className={classes.list}>
          {props.replies.length !== 0 ? (
            props.replies.map((reply) => (
              <React.Fragment key={reply.reply_id}>
                {reply.reply_id === 1 && (
                  <ListSubheader className={classes.subheader}>
                    Today
                  </ListSubheader>
                )}
                {reply.reply_id === 3 && (
                  <ListSubheader className={classes.subheader}>
                    Last Week
                  </ListSubheader>
                )}
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      alt="Profile Picture"
                      src={"/images/profile-pictures/".concat(
                        reply.profile_picture
                      )}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={reply.first_name.concat(reply.last_name)}
                    secondary={reply.message}
                  />

                  <ButtonGroup
                    color="primary"
                    aria-label="outlined primary button group"
                  >
                    {isEditable(reply.author_id) && (
                      <EditReply
                        onPost={props.onEdit}
                        message={reply.message}
                        reply_id={reply.reply_id}
                      />
                    )}
                    {isDeletable(reply.author_id) && (
                      <DeleteReply
                        onPost={props.onDelete}
                        reply_id={reply.reply_id}
                        comment_id={reply.comment_id}
                      />
                    )}
                  </ButtonGroup>

                  <AnswerLikeSection />
                  <AnswerDislikeSection />
                </ListItem>
              </React.Fragment>
            ))
          ) : (
            <React.Fragment></React.Fragment>
          )}
        </List>
      </Paper>
      <AppBar position="relative" color="Primary" className={classes.appBar}>
        <Toolbar>
          <AddReply onPost={props.onReply} />
          <div className={classes.grow} />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
