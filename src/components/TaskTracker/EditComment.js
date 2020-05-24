import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {} from "../../_actions/forum_actions";
import { useDispatch } from "react-redux";
import {editComment, getComments} from "../../_actions/taskTracker_actions";

export default function EditComment(props) {
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState({
    comment: props.comment
  });
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (prop) => (event) => {
    setEdit({ ...edit, [prop]: event.target.value });
  };

  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  const handleSubmit = () => {
    const commentData = {
      comment_id: props.comment_id,
      comment: edit.comment,
      project_id: props.project_id,
      updated_at: year + "-" + month + "-" + date,
    };
    editComment(commentData);
    dispatch(getComments(props.project_id));
    setOpen(false);
  };

  return (
    <div>
      <Button
        aria-label="edit"
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
      >
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth="true"
      >
        <DialogTitle id="form-dialog-title">Edit your Comment!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit comment and submit...!
          </DialogContentText>
          <TextField
            margin="dense"
            id="comment"
            label="My Commment"
            type="text"
            fullWidth
            multiline
            defaultValue={props.comment}
            onChange={handleChange("comment")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

