import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import history from '../../history'
import axios from 'axios';
import { useStyles } from "../../assets/css/editor";
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { useSelector } from "react-redux";
export default function DocumentDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [name,setName]=React.useState('');
  const [filecreated,setFileCreated]=React.useState(false);
  const user = useSelector(state => state.user);
  const group=props.group
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
        group: group,
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
              setFileCreated(true)

                setTimeout(() => {
                    history.push(`/document/${group}/editorblog`)
                }, 2000);
            }
        })
    
}
  return (
    <div>
       <div className={classes.roota}>
          <Collapse in={filecreated}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setFileCreated(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              Document Created!
            </Alert>
          </Collapse>
        </div>
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
          <form onSubmit={handleSubmit}>
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
              <Button type="submit" color="primary">
                Create
              </Button>
            </DialogActions>
          </form>
        </Dialog>
    </div>
  );
}