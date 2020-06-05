import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDispatch } from "react-redux";
import {editComment, getComments} from "../../_actions/taskTracker_actions";
import { useForm, Controller } from "react-hook-form";

export default function EditComment(props) {
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState({
    comment: props.comment
  });
  const { register, handleSubmit, errors, reset, control } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name: props.comment,
    },
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

  const onSubmit = () => {
    if (edit.comment){
    const commentData = {
      comment_id: props.comment_id,
      comment: edit.comment,
      project_id: props.project_id,
      updated_at: year + "-" + month + "-" + date,
    };
    editComment(commentData);
    dispatch(getComments(props.project_id));
    setOpen(false);
  }
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
        <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="form-dialog-title">Edit your Comment!</DialogTitle>
        <DialogContent>
          <TextField
          autoFocus
            margin="dense"
            id="comment"
            label="My Commment"
            type="text"
            name="name"
            variant="outlined"
            fullWidth
            multiline
            rowsMax={10}
            defaultValue={props.comment}
            inputRef={register({ required: true })}
            onChange={handleChange("comment")}
            error={!!errors.name}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSubmit} type="submit" color="primary" variant="contained">
            Update
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

