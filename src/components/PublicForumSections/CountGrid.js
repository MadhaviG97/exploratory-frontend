import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { height } from "window-size";
import Typography from "@material-ui/core/Typography";
import { primaryColor } from "../../assets/jss/material-kit-react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 10
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
  }
}));

export default function CountGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root} spacing={2}>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={6}>
          <Paper className={classes.paper} >
            <Typography variant="title" gutterBottom>
              Questions
            </Typography>
            <Typography variant="h5" gutterBottom>
              21
            </Typography>
            </Paper>
        </Grid>
        <Grid item xs={6}>
        <Paper className={classes.paper} >
            <Typography variant="title" gutterBottom>
              Answers
            </Typography>
            <Typography variant="h5" gutterBottom>
              42
            </Typography>
            </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
