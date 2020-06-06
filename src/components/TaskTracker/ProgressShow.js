import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: "#f5f5f5",
  },
  circle1: {
    color: "#dd2c00",
  },
  circle2: {
    color: "#4a148c",
  },
  circle3: {
    color: "#1b5e20",
  },
  part: {
    padding: theme.spacing(0.5),
    textAlign: "center",
  },
}));

export default function Progress(props) {
  const classes = useStyles();

  function getLength(obj) {
    var length = 0;
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
        length++;
      }
    }
    return length;
  }
  var not_started = 0;
  var in_progress = 0;
  var completed = 0;
  var total = getLength(props.tasks);

  if (getLength(props.tasks) > 0) {
    props.tasks.map((task) => {
      if (task.progress === "Not Started") {
        not_started = not_started + 1;
      }
      if (task.progress === "In Progress") {
        in_progress = in_progress + 1;
      }
      if (task.progress === "Completed") {
        completed = completed + 1;
      }
    });
  }

  if (total != 0) {
    var not_started_perc = Math.round((not_started / total) * 100);
    var in_progress_perc = Math.round((in_progress / total) * 100);
    var completed_perc = 100 - (not_started_perc + in_progress_perc);
  } else {
    var not_started_perc = 0;
    var in_progress_perc = 0;
    var completed_perc = 0;
  }
  console.log(not_started_perc, in_progress_perc, completed_perc);

  return (
    <div className={classes.root}>
      <Grid container spacing={3} justify="center">
        <Grid item className={classes.part} xs={3}>
          <Paper className={classes.paper}>
            <Typography variant="h6" color="textPrimary">
              NOT STARTED
            </Typography>
            <CircularProgress
              className={classes.circle1}
              size={70}
              thickness={22}
              variant="static"
              value={not_started_perc}
            />
            <Typography variant="h6" color="textPrimary">
              {not_started_perc + "%"}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Typography variant="h6" color="textPrimary">
              IN PROGRESS
            </Typography>
            <CircularProgress
              className={classes.circle2}
              size={70}
              thickness={22}
              variant="static"
              value={in_progress_perc}
            />
            <Typography variant="h6" color="textPrimary">
              {in_progress_perc + "%"}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <Typography variant="h6" color="textPrimary">
              COMPLETED
            </Typography>
            <CircularProgress
              className={classes.circle3}
              size={70}
              thickness={22}
              variant="static"
              value={completed_perc}
            />
            <Typography variant="h6" color="textPrimary">
              {completed_perc + "%"}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
