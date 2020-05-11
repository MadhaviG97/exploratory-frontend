import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Button } from '@material-ui/core'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// import AddParticipant from './autocomplete'
import AddParticipant from './AddParticipant'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    
    appBar: {
      top: 0,
      bottom: 'auto',
    },
    grow: {
      flexGrow: 1,
    }, 
  }),
);



const ChatListTopAppBar = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);


  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleClickDialogOpen = () => {
    setAnchorEl(null);
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };
// props.searchResearchers("Damika",(res)=>{console.log(res)})
  

  return (


    <AppBar position="relative" color="primary" className={classes.appBar}>
      <Toolbar>
        <Avatar alt="Chat" src="/static/images/avatar/1.jpg" />

        <Typography>Chat</Typography>
        <div className={classes.grow} />

        <IconButton edge="end" color="inherit">
          <MoreIcon aria-controls="chatList-menu" aria-haspopup="true" onClick={handleMenuClick} />



        </IconButton>

        <Menu
          id="chatList-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleClickDialogOpen}>Create New Group</MenuItem>

        </Menu>


      </Toolbar>

      <Dialog open={open} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create New Group</DialogTitle>
        <DialogContent>
          
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
          />

          <AddParticipant 
          handleSearchResearchers={props.handleSearchResearchers}
          handleAllResearchers={props.handleAllResearchers}
           />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDialogClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>

    </AppBar>

  );
}

export default ChatListTopAppBar
