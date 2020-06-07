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
import { useForm, Controller } from "react-hook-form";

export default function EditAnswer(props) {
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState({
    title: props.title,
    description: props.description,
  });
  const { register, handleSubmit, errors, reset, control } = useForm({
    mode: "onChange",
    reValidateMode: "onChange"
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
    if (edit.title) {
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
      setEdit({
        title: "",
        description: "",
      })
    }
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
        fullWidth
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id="form-dialog-title">Edit your Question!</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              id="title"
              label="Title"
              name="title"
              type="text"
              variant="outlined"
              fullWidth
              required
              multiline
              rowsMax={4}
              defaultValue={props.title}
              inputRef={register({ required: true })}
              onChange={handleChange("title")}
              error={!!errors.title}
            />
            <TextField
              margin="dense"
              id="description"
              label="Description"
              type="text"
              name="description"
              variant="outlined"
              fullWidth
              multiline
              rowsMax={10}
              defaultValue={props.description}
              inputRef={register({ max: 5000 })}
              onChange={handleChange("description")}
              error={!!errors.description}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={onSubmit}
              type="submit"
              color="primary"
              variant="contained"
              disabled={!!errors.title || !!errors.description}
            >
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
