//using npm or yarn
import React from "react";
import { Circle } from "react-spinners-css";
import Grid from "@material-ui/core/Grid";
import ReactLoading from "react-loading";
import { makeStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
const useStyles = makeStyles((theme) => ({
  root: {
    height: "82vh",
    alignItems: "center",
  },
  box: {
    alignItems: "center",
  },
  loader: {
    height: 550,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
}));

export default function Loader() {
  const classes = useStyles();
  return (
    <div>
      <Grid container component="main" className={classes.root}>
        {/* <CssBaseline /> */}
        
        
          <Grid container direction="row" justify="center"  alignItems="center">
            <Grid item item align="center">
              <div className={classes.loader}>
                <ReactLoading
                  type="spinningBubbles"
                  color="#5054CC"
                  height={550}
                  width={50}
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
    </div>
  );
}
