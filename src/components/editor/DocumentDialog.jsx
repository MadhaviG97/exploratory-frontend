import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FolderIcon from '@material-ui/icons/Folder';

export default function DocumentDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
       
        <Button
                size="large"
                htmlType="submit"
                style={{  background: '#014f82',//can change the sign-in button color from here
                color: '#FFFFFF',
                height: 40,
                boxShadow: ['none']}}
                variant="contained"
                component="label"
                onClick={handleClickOpen}
                //onSubmit={onSubmit}
            >
                Create
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        
            <DialogContent>
            <DialogContentText>
                Document Name
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label=""
                type="text"
                fullWidth
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}