import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import { deleteAnswer, getAnswers, getQuestions, getForumUsers } from "../../_actions/forum_actions"
import { useDispatch } from "react-redux";

export default function DeleteAnswer(props) {
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
    const answerData = {
        answer_id:props.answer_id,
        deleted_at:year + "-" + month + "-" + date,
    }
    deleteAnswer(answerData);
    dispatch(getQuestions());
    dispatch(getAnswers());
    dispatch(getForumUsers());
    console.log(answerData);
    setOpen(false);
  }

  return (
    <div>
      <IconButton
        aria-label="delete"
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure that you want to delete the answer...?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined">
            NO
          </Button>
          <Button onClick={handleDelete} color="primary" variant="contained" autoFocus>
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
