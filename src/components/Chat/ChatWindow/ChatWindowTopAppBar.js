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
import Divider from '@material-ui/core/Divider';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import ParticipantPanel from './ParticipantPanel'

// import AddParticipant from './AddParticipant'
// import ResponseDialog from './ResponseDialog'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      top: 0,
      bottom: 'auto',
      height: '60px',
    },
    grow: {
      flexGrow: 1,
    },
  }),
);



const ChatWindowTopAppBar = (props) => {

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
  
  return (
    <AppBar position="relative" color="primary" className={classes.appBar}>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={() => { props.controls.setHiddenState(true); }} >
          <ArrowBackIcon />
        </IconButton>

        <Avatar alt={props.state.chatRooms[props.listID].logo} src={props.state.chatRooms[props.listID].logo} />

        <Typography>{props.state.chatRooms[props.listID].name}</Typography>
        <div className={classes.grow} />

        <IconButton edge="end" color="inherit">
          <MoreIcon aria-controls="chatList-menu" aria-haspopup="true" onClick={handleMenuClick}/>
        </IconButton>

        <Menu
          id="chatList-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleClickDialogOpen}>Info</MenuItem>

        </Menu>

      </Toolbar>


      <Dialog open={open} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Group Information</DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Group Name"
            type="text"
            fullWidth
            defaultValue={props.state.chatRooms[props.listID].name}
            // onChange={(event) => {
            //   setInputName(event.target.value);
            // }}
          />

          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Group Description"
            type="text"
            fullWidth
            multiline
            rows="3"
            defaultValue={props.state.chatRooms[props.listID].description}
            // onChange={(event) => {
            //   setInputDescription(event.target.value);
            // }}
          />
            <Divider />

            <Typography variant="subtitle2">
              Participants
            </Typography>

            <ParticipantPanel
             state={props.state}
             listID={props.listID}
            />

          {/* <AddParticipant
            handleSearchResearchers={props.handleSearchResearchers}
            handleAllResearchers={props.handleAllResearchers}
            state={state}
            setState={setState}
          /> */}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          {/* <Button onClick={handleClickCreate} color="primary">
            Create
          </Button> */}
        </DialogActions>
      </Dialog>


    </AppBar>
  );
}

export default ChatWindowTopAppBar
