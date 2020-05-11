import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function EditProfile() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
            id="name"
            label="Username"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="profession"
            label="Profession"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="institute"
            label="Institute"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="linkedIn"
            label="LinkedIn"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="twitter"
            label="Twitter"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="personalDescription"
            label="Personal Description"
            fullWidth
            multiline
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Update Profile
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
