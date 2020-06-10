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
import LikeComment from "./LikeComment";
import DislikeComment from "./DislikeComment";
import AddReply from "./AddReply";
import EditReply from "./EditReply";
import DeleteReply from "./DeleteReply";
import { Typography } from "@material-ui/core";

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
  const [loggedInUser, setLoggedInUser] = React.useState(0);

  const isDeletable = (authur_id) => {
    if (authur_id === loggedInUser) {
      return true;
    }
    var collaborator;
    for (collaborator of project.collaborators) {
      if (loggedInUser === collaborator.researcher_id) {
        return true;
      }
    }
    return false;
  };

  const isEditable = (authur_id) => {
    return authur_id === loggedInUser ? true : false;
  };
  console.log(props.replies);

  React.useState(() => {
    if (user === {} || user.userData !== undefined) {
      setLoggedInUser(user.userData._id);
    }
  }, []);

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
                    <Avatar alt="Profile Picture" src={reply.profile_picture} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="button">
                        {reply.first_name + " " + reply.last_name}
                      </Typography>
                    }
                    secondary={reply.message}
                  />
                  <Typography variant="caption">
                    {getTimeAndDate(reply.created_at)}
                  </Typography>
                  <ButtonGroup
                    color="primary"
                    aria-label="outlined primary button group"
                  >
                    {isEditable(reply.author_id) && (
                      <EditReply
                        onPost={props.onEdit}
                        message={reply.message}
                        reply_id={reply.message_id}
                      />
                    )}
                    {isDeletable(reply.author_id) && (
                      <DeleteReply
                        onPost={props.onDelete}
                        reply_id={reply.message_id}
                        comment_id={reply.comment_id}
                        onReplyDelete={props.onReplyDelete}
                        onCommentDelete={props.onCommentDelete}
                      />
                    )}
                  </ButtonGroup>

                  <LikeComment
                    count={reply.no_of_likes}
                    reply_id={reply.reply_id}
                  />
                  <DislikeComment
                    count={reply.no_of_dislikes}
                    reply_id={reply.reply_id}
                  />
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

function getTimeAndDate(timestamp) {
  var date = new Date(timestamp);
  return date.toLocaleString();
}
