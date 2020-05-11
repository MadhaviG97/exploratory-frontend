import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useHistory, useLocation } from "react-router-dom";
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import { useSelector } from "react-redux";
export default function DocumentDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [name,setName]=React.useState('');
  const history = useHistory();
  const user = useSelector(state => state.user);
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
    
    const variables = {
        content: props.content,
        //writer: "GeeFour",
        name: name
    }
    let config = {
      headers: {
      'Authorization': `Bearer ${token}`
      }
    }
    
    axios.post('/editor/createPost', variables,config)
       .then(response => {
            if (response) {
              console.log('yep2')
              alert('Document Created!')

                setTimeout(() => {
                    history.push('/document/editorblog')
                }, 2000);
            }
        })
    
}
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