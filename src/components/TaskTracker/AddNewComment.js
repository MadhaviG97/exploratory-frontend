import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { getComments, addComment } from "../../_actions/taskTracker_actions";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";

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
  const user = useSelector((state) => state.user);
  const [open, setOpen] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const { register, handleSubmit, errors, reset, control } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  const onSubmit = () => {
    if (comment) {
      const commentData = {
        project_id: props.project_id,
        comment: comment,
        commentor_id: user.userData._id,
        created_at: year + "-" + month + "-" + date,
        updated_at: year + "-" + month + "-" + date,
      };
      setOpen(false);
      dispatch(addComment(commentData));
      dispatch(getComments(props.project_id));
      setComment("");
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        padding={10}
        onClick={handleClickOpen}
      >
        Add a Comment
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth="true"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id="form-dialog-title">Add Comment</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="comment"
              label="Your Comment"
              name="name"
              type="text"
              fullWidth
              multiline
              required
              variant="outlined"
              rowsMax={10}
              onChange={handleChange}
              inputRef={register({ required: true })}
              error={!!errors.name}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" variant="outlined">
              Cancel
            </Button>
            <Button
              onClick={onSubmit}
              type="submit"
              color="primary"
              variant="contained"
            >
              Post
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
