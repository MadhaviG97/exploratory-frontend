import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { height } from "window-size";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 10,
    width: "100%",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
  },
}));

export default function CountGrid() {
  const classes = useStyles();
  const questions = useSelector((state) => state.questions);
  function getLength(obj) {
    var length = 0;
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
        length++;
      }
    }
    return length;
  }
  return (
    <div className={classes.root} spacing={2}>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs >
          <Paper className={classes.paper}>
            <Typography variant="title" gutterBottom>
              Total Questions
            </Typography>
            <Typography variant="h5" gutterBottom>
              {getLength(questions.questions)}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
