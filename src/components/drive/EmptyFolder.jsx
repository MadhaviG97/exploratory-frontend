import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import history from '../../history'
import axios from 'axios';
import { useStyles } from "../../assets/css/projectFolderGrid";


export default function EmptyFolder(props) {
  const classes = useStyles();
  const [open,setOpen]=React.useState(false);
const [id,setId]=React.useState('');
  const handleClickOpen = (id) => {
    setId(id)
    setOpen(true);
  };

    const handleClose = () => {
        setOpen(false);
    };
  const handleDelete = () => {
    setOpen(false);
    const variable = { 
        folderId:props.folder
    }
    console.log(variable)
    const token = localStorage.token;
    let config = {
        headers: {
        'Authorization': `Bearer ${token}`
        }
      }
    
    axios.post('/drive/deletefolder', variable,config)
        .then(response => {
            if (response.data.success) {
                setTimeout(() => {
                    history.goBack();
                    }, 1000);
                
            } else {
                alert('Could not Delete Folder ')
            }
        })
    
};

  return (
    <div>
    <Dialog open={open} onClose={handleClose}  aria-labelledby="form-dialog-title">
        <DialogContent className={classes.formControl}>
            <DialogContentText>
                Delete Folder?
            </DialogContentText>
        </DialogContent>
        <DialogActions >
        <Button onClick={handleClose} variant="contained" color="primary">
            Cancel
        </Button>
        <Button onClick={handleDelete} color="primary">
            Delete
        </Button>
        </DialogActions>
    </Dialog>
    <Grid container justify="center" alignItems="center" spacing={3}>
      
      <Grid item xs={8} align='center'>

          <Box  alignItems="center">
              <div >
              <img  src={process.env.PUBLIC_URL + '/images/appnav/empty.png'} alt={"no files yet?"} />
              <h1  className={classes.topic3}>It seems that you don't have any files here yet.</h1>
              <Box p={1}/>
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
                Delete this Folder
            </Button>
              </div>
              
              
          </Box>
            
        
      </Grid>
    </Grid>
    </div>
  );
}

