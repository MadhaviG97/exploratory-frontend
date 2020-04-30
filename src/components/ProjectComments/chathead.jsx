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
import { Button, Paper } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import ChatThread from "./chatThread";
import { useSelector } from "react-redux";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    alignItems: "center",
    padding: theme.spacing(1),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
    padding: theme.spacing(0, 4),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    padding: theme.spacing(0, 4),
  },
  newComment: {
    padding: theme.spacing(0, 3),
  },
}));

export default function Comments(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid md="12" align="right" className={classes.newComment}>
        <Button variant="contained" color="primary" onClick={handleNewComment}>
          New Comment
        </Button>
      </Grid>
      {props.comments.map((chat) => {
        return <CommentHeads chat={chat} />;
      })}
    </React.Fragment>
  );
}

function CommentHeads(props) {
  const classes = useStyles();

  const user = useSelector((state) => state.user);

  const [expanded, setExpanded] = React.useState(false);

  const [replies, setReplies] = React.useState([]);

  const handleChange = (panel) => (event, isExpanded) => {
    axios
      .post("/project/view-replies", { id: props.chat.comment_id })
      .then((response) => {
        setReplies(response.data);
        setExpanded(isExpanded ? panel : false);

        console.log(response.data);
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (reply_id, message) => {
    const formData = {
      id: reply_id,
      message: message,
    };

    axios
      .post("/project/edit-reply", formData)
      .then((response) => {
        rerenderReplies();
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (reply_id) => {
    const formData = {
      reply_id: reply_id,
    };

    axios
      .post("/project/edit-reply", formData)
      .then((response) => {
        rerenderReplies();
      })
      .catch((err) => console.log(err));
  };

  const rerenderReplies = () => {
    axios
      .post("/project/view-replies", { id: props.chat.comment_id })
      .then((response) => {
        setReplies(response.data);
      })
      .catch((err) => console.log(err));
  };

  const handleReply = (reply) => {
    const formData = {
      author_id: user.userData._id,
      comment_id: props.chat.comment_id,
      message: reply,
      no_of_likes: 0,
      initial_comment: 0,
    };
    console.log(formData);
    axios
      .post("/project/reply-comment", formData)
      .then((response) => {
        console.log(response);
        rerenderReplies();
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
              <Avatar
                src={"/images/profile-pictures/".concat(
                  props.chat.profile_picture
                )}
              />
            </Box>
            <Box flexGrow="1">
              <Typography variant="button" className={classes.heading}>
                {props.chat.first_name.concat(" ").concat(props.chat.last_name)}
              </Typography>
              <Typography className={classes.secondaryHeading}>
                {props.chat.institution}
              </Typography>

              {/* <Typography variant="button" className={classes.heading}>
                {props.chat.first_name.concat(" ").concat(props.chat.last_name)}
              </Typography> */}
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
                onDelete={handleDelete}
              />
              {/* should pass replies as props */}
            </CardContent>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
    </div>
  );
}
