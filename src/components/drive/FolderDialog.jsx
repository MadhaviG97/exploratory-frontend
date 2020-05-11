/*
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FolderIcon from '@material-ui/icons/Folder';
import Tooltip from '@material-ui/core/Tooltip';

export default function FolderDialog() {
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const [name,setName]=React.useState('');
  let folder=props.match.params
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setName(event.target.value);
  };
  const handleSubmit = (event) => {
    console.log('yep')
    event.preventDefault();
    const token = localStorage.token;
    if (folder){
      folder=props.match.params.folderId
    }
    else{
      folder="root"
    }
    const variables = {
        group: "GeeFour",
        name: name,
        folder:folder
    }
    let config = {
      headers: {
      'Authorization': `Bearer ${token}`
      }
    }
    axios.post('/drive/createfolder', variables,config)
       .then(response => {
            if (response) {
              console.log('yep2')
              alert('Folder Created!')

                setTimeout(() => {
                    history.push('/document/filemanger')
                }, 2000);
            }
        })
    
}

  return (
    <div>
      <Tooltip title="Add a Folder">
        <Button style={{ //can change the sign-in button color from here
          
          boxShadow: ['none']}} 
          component="label" onClick={handleClickOpen}>
          <FolderIcon/>
          New folder
        </Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        
        <DialogContent>
          <DialogContentText>
            Enter Folder Name
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label=""
            type="text"
            fullWidth
            required
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
        
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
*/