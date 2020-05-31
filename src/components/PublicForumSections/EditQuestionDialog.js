import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import {
  editQuestion,
  getQuestions,
  getAnswers,
  getPopularQuestions,
  getPopularAnswers,
} from "../../_actions/forum_actions";
import { useDispatch } from "react-redux";

export default function EditAnswer(props) {
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState({
    title: props.title,
    description: props.description,
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
    const questionData = {
      question_id: props.question_id,
      title: edit.title,
      description: edit.description,
      updated_at: year + "-" + month + "-" + date,
    };
    editQuestion(questionData);
    dispatch(getQuestions());
    dispatch(getAnswers());
    dispatch(getPopularQuestions());
    dispatch(getPopularAnswers());
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        aria-label="edit"
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        <EditIcon fontSize="small" />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit your Question!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill the appropriate fields and submit...!
          </DialogContentText>
          <TextField
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            multiline
            defaultValue={props.title}
            onChange={handleChange("title")}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            defaultValue={props.description}
            onChange={handleChange("description")}
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
