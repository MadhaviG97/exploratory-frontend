import React from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button, Typography, IconButton, Card, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";

function Form(props) {
  return (
    <Card>
      <TextField
        id="goal"
        name="goal"
        multiline
        fullWidth
        rows={4}
        defaultValue={props.value}
        variant="outlined"
        autoComplete="description"
      />
    </Card>
  );
}

export default function GoalForm(props) {
  const useStyles = makeStyles((theme) => ({
    dialogaction: {
      padding: theme.spacing(1, 3, 2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  }));

  const classes = useStyles();
  return (
    <Dialog
      open={props.open}
      onClose={props.onClick}
      aria-labelledby="form-dialog-title"
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">
        <Typography variant="subtitle1" color="primary">
          {" "}
          <Box fontWeight="fontWeightBold">GOAL</Box>
        </Typography>

        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={() => props.handleClose("goal")}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers={true}>
        <Form value={props.defaultValue} />
      </DialogContent>
      <DialogActions className={classes.dialogaction}>
        <Button variant="outlined" color="primary">
          submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
