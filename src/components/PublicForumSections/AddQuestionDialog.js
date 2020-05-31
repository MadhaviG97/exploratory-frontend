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
    category: {},
    title: "",
    description: "",
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
      category: {},
      title: "",
      description: "",
    });
  };

  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();

  const handleSubmit = () => {
    const questionData = {
      researcher_id: user.userData._id,
      first_name: user.userData.first_name,
      last_name: user.userData.last_name,
      created_at: year + "-" + month + "-" + date,
      category_name: question.category.category_name,
      category_id: question.category.id,
      title: question.title,
      description: question.description,
      profile_picture: user.userData.profile_picture,
      isAuth: user.userData.isAuth,
    };
    setOpen(false);
    dispatch(addQuestion(questionData));
    setQuestion({
      category: {},
      title: "",
      description: "",
    });
    dispatch(getQuestions());
    dispatch(getAnswers());
    dispatch(getForumUsers());
    dispatch(getFreqUsers());
    dispatch(getPopularQuestions());
    dispatch(getPopularAnswers());
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
        <DialogTitle>Raise your Question</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the details below.Try to provide appropriate details
            for the question so it can be answered easier.
          </DialogContentText>

          <form className={classes.root} noValidate autoComplete="off">
            <FormControl className={classes.formControl} required>
              <InputLabel>Category</InputLabel>
              <Select onChange={handleChange("category")}>
                {categories.map((category) => (
                  <MenuItem value={category}>{category.category_name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <br />

            <TextField
              fullWidth
              id="Question title"
              label="Question Title"
              className={classes.formControl}
              required
              multiline
              rowsMax={2}
              onChange={handleChange("title")}
            />
            <br />

            <TextField
              fullWidth
              id="Description"
              label="Description"
              className={classes.formControl}
              multiline
              rowsMax={4}
              onChange={handleChange("description")}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
