import React from "react";
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
import ChatThread from "./CommentThread";
import { useSelector } from "react-redux";
import axios from "axios";
import AddNewComment from "./Operations/AddNewComment";
import Alert from "@material-ui/lab/Alert";
import { useStyles } from "../../assets/css/commentHead";
import CommentHead from "./CommentHead";

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
            variant="outlined"
            onClose={() => {
              setSuccess(false);
            }}
          >
            Successfully added the comment !
          </Alert>
        </Box>
      )}
      <Grid container>
        <Grid item lg={2} md="3" sm={3} xs={3} className={classes.newComment}>
          <AddNewComment onNewComment={handleRefreshComment} />
        </Grid>
        <Grid item lg={8} md="8" sm={9} xs={9}>
          {comments.length !== 0 ? (
            comments.map((chat) => {
              return (
                <React.Fragment>
                  <CommentHead
                    chat={chat}
                    onCommentDelete={handleRefreshComment}
                  />
                  <br />
                </React.Fragment>
              );
            })
          ) : (
            <img src="/images/project/Empty.png" />
          )}
        </Grid>
        <Grid item lg={2} md="1" xs={0} />
      </Grid>
    </React.Fragment>
  );
}
