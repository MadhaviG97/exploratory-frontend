import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar style={{ display: "flex", justifyContent: "center" }}>
          <Typography
            className={classes.title}
            align="center"
            variant="h6"
            noWrap
          >
            Collaborative WhiteBoards
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
