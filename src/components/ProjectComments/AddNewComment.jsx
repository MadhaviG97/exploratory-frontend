import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getComments } from "../../_actions/project_actions";

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

export default function AddComment(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [comment, setComment] = React.useState("");

  const user = useSelector((state) => state.user);
  const project = useSelector((state) => state.project).renderData.project;
  const dispatch = useDispatch();

  const handleClickOpen = (e) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    console.log(comment);
    setComment(e.target.value);
  };

  const handleNewComment = (e) => {
    console.log(project);
    const formData = {
      project_id: project.id,
      author_id: user.userData._id,
      message: comment,
      no_of_likes: 0,
      initial_comment: 1,
    };
    axios
      .post("/project/comments/new-comment", formData)
      .then((response) => {
        setOpen(false);
        props.onNewComment();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {/* <Fab
        color="Primary"
        aria-label="add"
        className={classes.fabButton}
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab> */}
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        New Comment
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Comment</DialogTitle>
        <DialogContent>
          <DialogContentText>Please Give us you feedback!</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Your Answer"
            type="text"
            fullWidth
            multiline
            value={comment}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleNewComment}
            color="primary"
            variant="contained"
          >
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}