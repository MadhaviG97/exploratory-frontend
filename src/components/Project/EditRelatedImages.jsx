import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Paper from "@material-ui/core/Paper";
import DialogTitle from "@material-ui/core/DialogTitle";
import ImageUploader from "../Project/ImageUploader";
import { makeStyles } from "@material-ui/core/styles";

let useStyles = makeStyles((theme) => ({
  fileUploader: {
    padding: theme.spacing(0.5, 2),
  },
}));

export default function FormDialog(props) {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        fullWidth
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Related Images</DialogTitle>
        <DialogContent>
          <Paper className={classes.fileUploader} elevation={3}>
            <ImageUploader
              maxFiles={30}
              multiple={true}
              accept={"image/*"}
              type="related_images"
              project_id={props.id}
              default={props.related_images ? props.related_images : []}
            />
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={props.onClose} color="primary">
            CLOSE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
