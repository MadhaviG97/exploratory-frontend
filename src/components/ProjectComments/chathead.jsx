import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";
import Box from "@material-ui/core/Box";
import CardContent from "@material-ui/core/CardContent";
import ChatThread from "./chatThread";
import { useSelector } from "react-redux";
import axios from "axios";
import AddNewComment from "./AddNewComment";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    alignItems: "center",
    padding: theme.spacing(1),
  },
  heading: {
    fontSize: theme.typography.pxToRem(14),
    flexBasis: "33.33%",
    flexShrink: 0,
    padding: theme.spacing(0, 4),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(12),
    color: theme.palette.text.secondary,
    padding: theme.spacing(0, 4),
  },
  firstComment: {
    fontSize: theme.typography.pxToRem(14),
    color: theme.palette.text.primary,
    padding: theme.spacing(0, 4),
  },
  newComment: {
    padding: theme.spacing(2, 2, 1),
  },
}));

export default function Comments(props) {
  const classes = useStyles();
  const [success, setSuccess] = React.useState(false);
  const [comments, setComments] = React.useState(props.comments);
  const project = useSelector((state) => state.project).renderData.project;
  const [alertMessage, setAlertMessage] = React.useState(false);
  const handleRefreshComment = () => {
    axios
      .post("/project/comments/view-comments", { id: project.id })
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          setComments(response.data);
          setSuccess(true);
          setAlertMessage(true);
        } else {
          setComments([]);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <React.Fragment>
      {success && (
        <Box>
          <Alert
            variant="filled"
            onClose={() => {
              setSuccess(false);
            }}
          >
            Successfully added the comment !
          </Alert>
        </Box>
      )}
      <Grid container>
        <Grid item lg={2} md="2" xs={3} className={classes.newComment}>
          <AddNewComment onNewComment={handleRefreshComment} />
        </Grid>
        <Grid item lg={8} md="8" xs={9}>
          {comments.map((chat) => {
            return (
              <CommentHeads
                chat={chat}
                onCommentDelete={handleRefreshComment}
              />
            );
          })}
        </Grid>
        <Grid item lg={2} md="2" xs={0} />
      </Grid>
    </React.Fragment>
  );
}

function CommentHeads(props) {
  const classes = useStyles();

  const user = useSelector((state) => state.user);

  const [expanded, setExpanded] = React.useState(false);

  const [replies, setReplies] = React.useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    rerenderReplies(() => {
      setExpanded(isExpanded ? panel : false);
    });
  };

  const handleEdit = (reply_id, message, cb) => {
    const formData = {
      id: reply_id,
      message: message,
    };
    console.log(formData);

    axios
      .post("/project/comments/edit-reply", formData)
      .then((response) => {
        cb();
        rerenderReplies(() => console.log(response));
      })
      .catch((err) => console.log(err));
  };

  const rerenderReplies = (cb) => {
    axios
      .post("/project/comments/view-replies", { id: props.chat.comment_id })
      .then((response) => {
        setReplies(response.data);
        cb();
      })
      .catch((err) => console.log(err));
  };

  const handleReplyDelete = () => {
    rerenderReplies(() => console.log(props.chat));
  };

  const handleCommentDelete = () => {
    props.onCommentDelete();
  };

  const handleReply = (reply) => {
    const formData = {
      author_id: user.userData._id,
      comment_id: props.chat.comment_id,
      message: reply,
      no_of_likes: 0,
      no_of_dislikes: 0,

      initial_comment: 0,
    };
    console.log(formData);
    axios
      .post("/project/comments/reply-comment", formData)
      .then((response) => {
        rerenderReplies(() => console.log(response));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.root}>
      <Grid md="12">
        <ExpansionPanel
          style={{ elevation: 5 }}
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <ExpansionPanelSummary
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Box>
              <Avatar src={props.chat.profile_picture} />
            </Box>
            <Box flexGrow="1">
              <Typography variant="button" className={classes.heading}>
                {props.chat.first_name.concat(" ").concat(props.chat.last_name)}
              </Typography>
              <Typography className={classes.secondaryHeading}>
                {props.chat.institution}
              </Typography>
              <Typography className={classes.firstComment}>
                {props.chat.message}
              </Typography>
            </Box>

            <Box>
              <Badge
                color="secondary"
                badgeContent={props.chat.length}
                showZero
              >
                <MailIcon />
              </Badge>
            </Box>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <CardContent>
              <ChatThread
                replies={replies}
                onReply={handleReply}
                onEdit={handleEdit}
                onReplyDelete={handleReplyDelete}
                onCommentDelete={handleCommentDelete}
              />
              {/* should pass replies as props */}
            </CardContent>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
    </div>
  );
}
