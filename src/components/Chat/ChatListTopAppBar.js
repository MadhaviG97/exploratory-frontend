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
import {groupName_validation, groupDescription_validation} from './Validation/validation'

import AddParticipant from './AddParticipant'
import DirrectChatDialog from './ChatList/DirrectChatDialog'

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

  const [openDirectChatDialog,setOpenDirrectChatDialog] = React.useState(false);

  const [state, setState] = React.useState({
    title: "",
    description: "",
    currentuser: null,
    collaborators: [],
    tags: [],
    allCollaborators: [],
    user_id: props.state.user_id
  });

  const [inputName, setInputName] = React.useState("")
  const [inputDescription, setInputDescription] = React.useState("")
  const [openResponseDialog, setOpenResponseDialog] = React.useState(false);
  const [responseDialogMsg, setResponseDialogMsg] = React.useState("")

  const [nameError, setNameError] = React.useState(true)
  const [descriptionError,setDescriptionError] = React.useState(true)
  const [nameHT,setNameHT] = React.useState("")
  const [descriptionHT,setDescriptionHT] = React.useState("")

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
    setInputName("")
    setInputDescription("")
    setNameError(true)
    setDescriptionError(true)
    setOpen(false);
  };
  
  const handleClickDirrectChatDialogOpen = () => {
    setAnchorEl(null);
    setOpenDirrectChatDialog(true);
  };

  const handleDirrectChatDialogClose = () => {
    setOpenDirrectChatDialog(false);
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
      participants: participants,
      isDirrect:0
    }
    
    props.state.client.createChatroom(chatDetails, (res) => {
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

  const validateGroupName = (value) =>{
    const { error  } = groupName_validation(value);
    if(error){
      setNameError(true)
      setNameHT(error.details[0].message)
    }
    else{
      setNameError(false)
      setNameHT("")
    }
  }
  
  const validateDescription = (value) =>{
    const { error } = groupDescription_validation(value);
    if(error){
      setDescriptionError(true)
      setDescriptionHT(error.details[0].message)
    }
    else{
      setDescriptionError(false)
      setDescriptionHT("")
    }
  }

  return (
    
    <AppBar position="relative" color="primary" className={classes.appBar}>
      <Toolbar>


        <Typography>Exploratory Chat</Typography>
        <div className={classes.grow} />

        <IconButton id="moreButton" edge="end" color="inherit">
          <MoreIcon aria-controls="chatList-menu" aria-haspopup="true" onClick={handleMenuClick} />
        </IconButton>

        <Menu
          id="chatList-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleClickDialogOpen}>Create a New Group</MenuItem>
          <MenuItem onClick={handleClickDirrectChatDialogOpen}>Start a Dirrect Chat</MenuItem>
        
        </Menu>


      </Toolbar>

      <Dialog open={open} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create a New Group</DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Group Name"
            type="text"
            fullWidth
            onChange={(event) => {
              validateGroupName(event.target.value)
              setInputName(event.target.value);
            }}
            error={nameError}
            helperText={nameHT}
          />

          <TextField
            // autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            multiline={true}
            rows={4}
            fullWidth
            onChange={(event) => {
              validateDescription(event.target.value)
              setInputDescription(event.target.value);
            }}
            error={descriptionError}
            helperText={descriptionHT}
          />

          <AddParticipant
            state={state}
            setState={setState}
            client={props.state.client}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button disabled={nameError||descriptionError} onClick={handleClickCreate} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>

            <DirrectChatDialog
            openDirectChatDialog={openDirectChatDialog}
            handleDirrectChatDialogClose={handleDirrectChatDialogClose}
            state={props.state}
            setStateFromChild={props.setStateFromChild}
            />
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
