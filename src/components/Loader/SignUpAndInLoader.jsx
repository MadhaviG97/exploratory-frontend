import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function CircularIntegration(props) {
  const classes = useStyles();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: props.success,
  });

  const handleButtonClick = (e) => {
    props.onClick(e);
  };

  return (
    <div className={classes.wrapper}>
      <React.Fragment>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={buttonClassname}
          disabled={props.loading}
          onClick={handleButtonClick}
        >
          {props.name}
        </Button>
        {props.loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </React.Fragment>
    </div>
  );
}
