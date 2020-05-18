import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { updateProfile } from "../../_actions/user_profile";

export default function EditProfile(props) {
  const [open, setOpen] = React.useState(false);
  const [details, setDetails] = React.useState({
    profession: "",
    linkedIn: "",
    twitter:"",
    description:""
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false)
  };

  const handleSubmit = () => {
    setOpen(false);
    updateProfile(details);
    setDetails({
      profession: "",
      linkedIn: "",
      twitter:"",
      description:""
    });
  }

  const handleChange = (prop) => (event) => {
    setDetails({ ...details, [prop]: event.target.value });
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Edit Profile Info
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Profile Info</DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            margin="dense"
            id="profession"
            label="Profession"
            fullWidth
            multiline
            defaultValue={props.profileDetails.profession}
            onChange={handleChange("profession")}
          />
          <TextField
            autoFocus
            margin="dense"
            id="linkedIn"
            label="LinkedIn"
            fullWidth
            multiline
            defaultValue={props.profileDetails.linkedIn}
            onChange={handleChange("linkedIn")}
          />
          <TextField
            autoFocus
            margin="dense"
            id="twitter"
            label="Twitter"
            fullWidth
            multiline
            defaultValue={props.profileDetails.twitter}
            onChange={handleChange("twitter")}
          />
          <TextField
            autoFocus
            margin="dense"
            id="personalDescription"
            label="Personal Description"
            fullWidth
            multiline
            defaultValue={props.profileDetails.description}
            onChange={handleChange("description")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Update Profile
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
