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

export default function Progress() {
  const classes = useStyles();

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
              value={17}
            />
            <Typography variant="h6" color="textPrimary">
              17%
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
              value={21}
            />
            <Typography variant="h6" color="textPrimary">
              21%
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
              value={62}
            />
            <Typography variant="h6" color="textPrimary">
              62%
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
