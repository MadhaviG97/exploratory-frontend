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
import ResponseDialog from './ResponseDialog'

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

  const [state, setState] = React.useState({
    title: "",
    description: "",
    currentuser: null,
    collaborators: [],
    tags: [],
    allCollaborators: [],
    user_id: props.user_id
  });

  const [inputName, setInputName] = React.useState("")
  const [inputDescription, setInputDescription] = React.useState("")
  const [openResponseDialog, setOpenResponseDialog] = React.useState(false);
  const [responseDialogMsg, setResponseDialogMsg] = React.useState("")

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
  
  const handleClickCreate = () => {
    var participants = [{
      user_id: state.user_id,
      isAdmin: 1,
    }]

    state.collaborators.forEach(c => {
      participants.push({
        user_id: c,
        isAdmin: 0,
      })
    })

    var chatDetails = {
      name: inputName,
      description: inputDescription,
      creator_id: state.user_id,
      participants: participants
    }

    props.client.createChatroom(chatDetails, (res) => {
      setResponseDialogMsg(res.message)
      handleClickOpenResponseDialog()
    })
    handleDialogClose()
  }

  const handleClickOpenResponseDialog = () => {
    setOpenResponseDialog(true);
  };

  const handleCloseResponseDialog = () => {
    setOpenResponseDialog(false);
    props.state.client.getChatrooms((err, res) => {
      props.setStateFromChild({ chatRooms: res })
    })
  };

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
        <DialogTitle id="form-dialog-title">Create a New Group</DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            onChange={(event) => {
              setInputName(event.target.value);
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            onChange={(event) => {
              setInputDescription(event.target.value);
            }}
          />

          <AddParticipant
            handleSearchResearchers={props.handleSearchResearchers}
            handleAllResearchers={props.handleAllResearchers}
            state={state}
            setState={setState}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClickCreate} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <ResponseDialog
        open={openResponseDialog}
        handleCloseResponseDialog={handleCloseResponseDialog}
        title={responseDialogMsg}
      // description={"Group Created Successfully"}
      />

    </AppBar>

  );
}

export default ChatListTopAppBar
