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
import {
  addAnswer,
  getAnswers,
  getForumUsers,
  getFreqUsers,
  getPopularAnswers,
  getPopularQuestions,
} from "../../_actions/forum_actions";
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
  const [answer, setAnswer] = React.useState("");
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
    setAnswer(event.target.value);
  };

  const onSubmit = () => {
    if (answer) {
      const answerData = {
        answer: answer,
        question_id: props.question_id,
        researcher_id: user.userData._id,
      };
      setOpen(false);
      dispatch(addAnswer(answerData));
      dispatch(getAnswers());
      dispatch(getForumUsers());
      dispatch(getFreqUsers());
      dispatch(getPopularQuestions());
      dispatch(getPopularAnswers());
      setAnswer("");
    }
  };

  return (
    <div>
      <Fab
        color="Primary"
        aria-label="add"
        className={classes.fabButton}
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <form onSubmit={handleSubmit(onSubmit)} >
          <DialogTitle id="form-dialog-title">Add Answer</DialogTitle>
          <DialogContent>
            <DialogContentText>{props.question_title}</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="answer"
              label="Your Answer"
              type="text"
              variant="outlined"
              fullWidth
              multiline
              required
              onChange={handleChange}
              rowsMax={10}
              inputRef={register({ required: true })}
              error={!!errors.answer}
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
