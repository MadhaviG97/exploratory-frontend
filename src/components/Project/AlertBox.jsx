import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function AlertDialog(props) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {"Are you sure you want to save changes?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.onClose()} color="primary">
            cancel
          </Button>
          <Button onClick={() => props.onSubmit()} color="primary" autoFocus>
            save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
