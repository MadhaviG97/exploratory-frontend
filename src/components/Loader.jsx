//using npm or yarn
import React from "react";
import { Circle } from "react-spinners-css";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
const useStyles = makeStyles((theme) => ({
  root: {
    height: "80vh",
  },
  box: {
    alignItems: "center",
  },
}));

export default function Loader() {
  const classes = useStyles();
  return (
    <div>
      <Grid container component="main" className={classes.root}>
        {/* <CssBaseline /> */}
        <Grid item xs={false} sm={5} md={5} />
        <Grid item xs={12} sm={2} md={2} component="paper" elevation={6} square>
          <Grid container>
            <Grid item>
              <Circle color="#014F82" size={150} />
            </Grid>
            <Grid item>
              <Circle color="#014F82" size={150} />
            </Grid>
            <Grid item>
              <Circle color="#014F82" size={150} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={false} sm={5} md={5} />
      </Grid>
      <Box p={5}/>
    </div>
  );
}
