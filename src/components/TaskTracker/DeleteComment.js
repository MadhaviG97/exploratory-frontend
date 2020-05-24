import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

import { deleteComment, getComments } from "../../_actions/taskTracker_actions";
import { useDispatch } from "react-redux";

export default function DeleteComment(props) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  const handleDelete = () => {
    const commentData = {
      comment_id: props.comment_id,
      project_id: props.project_id,
      deleted_at: year + "-" + month + "-" + date,
    };
    deleteComment(commentData);
    dispatch(getComments( props.project_id));
    console.log(commentData);
    setOpen(false);
  };

  return (
    <div>
      <Button
        aria-label="delete"
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
      >
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure that you want to delete the comment...?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined">
            NO
          </Button>
          <Button
            onClick={handleDelete}
            color="primary"
            variant="contained"
            autoFocus
          >
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
