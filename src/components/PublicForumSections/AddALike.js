import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

import {
  getAnswers,
  likeAnswer,
  getPopularAnswers,
  getPopularQuestions,
} from "../../_actions/forum_actions";
import { useDispatch, useSelector } from "react-redux";

export default function LikeAnswer(props) {
  const [open, setOpen] = React.useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLike = () => {
    const answerData = {
      answer_id: props.answer_id,
      question_id: props.question_id,
      researcher_id: user.userData._id,
    };
    likeAnswer(answerData);
    dispatch(getAnswers());
    dispatch(getPopularQuestions());
    dispatch(getPopularAnswers());
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        aria-label="increase"
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        <ThumbUpIcon color="primary" fontSize="small" />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you think this answer helped you...?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined">
            NO
          </Button>
          <Button
            onClick={handleLike}
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
