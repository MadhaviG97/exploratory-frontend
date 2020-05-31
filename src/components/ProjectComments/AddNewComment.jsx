import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Box from "@material-ui/core/Box";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import ButtonLoader from "../Loader/ButtonLoader";

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
  const [sucess, setSuccess] = React.useState(false);
  const user = useSelector((state) => state.user);
  const project = useSelector((state) => state.project).renderData.project;
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

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
    setLoading(true);
    console.log(project);
    const formData = {
      project_id: project.id,
      author_id: user.userData._id,
      message: comment,
      no_of_likes: 0,
      no_of_dislikes: 0,
      initial_comment: 1,
    };
    axios
      .post("/project/comments/new-comment", formData)
      .then((response) => {
        setOpen(false);
        setSuccess(true);
        setLoading(false);
        setComment("");
        props.onNewComment();
      })
      .catch((err) => console.log(err));
  };

  return (
    <React.Fragment>
      <Box>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          New Comment
        </Button>
      </Box>
      <br />
      {sucess && (
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
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
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

          <ButtonLoader
            name="Post"
            success={sucess}
            loading={loading}
            onClick={handleNewComment}
          />
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
