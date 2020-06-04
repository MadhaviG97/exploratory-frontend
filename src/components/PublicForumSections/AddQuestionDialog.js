import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {
  addQuestion,
  getQuestions,
  getAnswers,
  getForumUsers,
  getFreqUsers,
  getPopularQuestions,
  getPopularAnswers,
} from "../../_actions/forum_actions";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
      fullWidth: "true",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 500,
    fullWidth: "true",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function QuestionDialog(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const is_logged = useSelector((state) => state.is_logged);
  const [categories, setCategories] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [question, setQuestion] = useState({
    category_id: "",
    title: "",
    description: "",
  });
  const { register, handleSubmit, errors, reset, control } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const response = await fetch(`forum/questioncategory`);
    const data = await response.json();
    setCategories(data.data);
    console.log(data.data);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setQuestion({
      category_id: "",
      title: "",
      description: "",
    });
  };

  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  const onSubmit = (data) => {
    console.log(question);
    if (question.category_id && question.title) {
      const questionData = {
        researcher_id: user.userData._id,
        first_name: user.userData.first_name,
        last_name: user.userData.last_name,
        created_at: year + "-" + month + "-" + date,
        category_id: question.category_id,
        title: question.title,
        description: question.description,
        profile_picture: user.userData.profile_picture,
        isAuth: user.userData.isAuth,
      };
      setOpen(false);
      dispatch(addQuestion(questionData));
      setQuestion({
        category_id: "",
        title: "",
        description: "",
      });
      dispatch(getQuestions());
      dispatch(getAnswers());
      dispatch(getForumUsers());
      dispatch(getFreqUsers());
      dispatch(getPopularQuestions());
      dispatch(getPopularAnswers());
    }
  };

  const handleChange = (prop) => (event) => {
    setQuestion({ ...question, [prop]: event.target.value });
  };

  return (
    <div>
      {is_logged ? (
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Ask a Question
        </Button>
      ) : (
        <div></div>
      )}

      <Dialog open={open} onClose={handleClose} fullWidth>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Raise your Question</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill out the details below.Try to provide appropriate
              details for the question so it can be answered easier.
            </DialogContentText>

            <form className={classes.root} noValidate autoComplete="off">
              <FormControl className={classes.formControl} required error={Boolean(errors.category)}>
                <InputLabel>Category</InputLabel>
                <Controller
                  as={
                    <Select
                      onChange={handleChange("category_id")}
                      name="category"
                    >
                      {categories.map((category) => (
                        <MenuItem value={category.id}>
                          {category.category_name}
                        </MenuItem>
                      ))}
                    </Select>
                  }
                  name="category"
                  rules={{ required: "true" }}
                  error={!!errors.category}
                  control={control}
                  defaultValue=""
                  onChange={([selected]) => {
                    setQuestion({...question,category_id:selected.target.value})
                    return selected;
                  }}
                />
              </FormControl>
              <br />

              <TextField
                margin="dense"
                name="title"
                type="text"
                variant="outlined"
                inputRef={register({ required: true })}
                error={!!errors.title}
                fullWidth
                id="Question title"
                label="Question Title"
                className={classes.formControl}
                required
                multiline
                rowsMax={4}
                onChange={handleChange("title")}
              />
              <br />

              <TextField
                fullWidth
                margin="dense"
                name="description"
                type="text"
                variant="outlined"
                inputRef={register({ max: 5000 })}
                error={!!errors.title}
                id="Description"
                label="Description"
                className={classes.formControl}
                multiline
                rowsMax={10}
                onChange={handleChange("description")}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              color="primary"
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              onClick={onSubmit}
              type="submit"
              color="primary"
              variant="contained"
              disabled={!!errors.title || !!errors.description || !!errors.category}
            >
              Post
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
