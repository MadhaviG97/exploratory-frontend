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
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import ParticipantPanel from './ParticipantPanel'

// import AddParticipant from './AddParticipant'
import ResponseDialog from '../ResponseDialog'
import AddNewParticipant from './AddNewParticipant'

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
    fabButton: {
      position: 'absolute',
      zIndex: 1,
      // top: -30,
      left: 0,
      right: 0,
      margin: '0 auto',
    },
  }),
);



const ChatWindowTopAppBar = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [inputName, setInputName] = React.useState(props.state.chatRooms[props.state.currentChatListID].name)
  const [inputDescription, setInputDescription] = React.useState(props.state.chatRooms[props.state.currentChatListID].description)

  const [openResponseDialog, setOpenResponseDialog] = React.useState(false);
  const [responseDialogMsg, setResponseDialogMsg] = React.useState("")

  const [addNewParticipantOpen,setAddNewParticipantOpen] = React.useState(false)


  React.useEffect(()=>{
    const setData= async()=>{
     setInputName(props.state.chatRooms[props.state.currentChatListID].name)
     setInputDescription(props.state.chatRooms[props.state.currentChatListID].description)
    }
    setData()
    
  },[props.state.currentChatListID,props.state.globalReload])


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

  const handleClickSave = () => {
    var chatInfo = {
      id: props.state.currentChatID,
      name: inputName,
      description: inputDescription
    }
  
    props.state.client.updateChatInfo(chatInfo, (res) => {
      setResponseDialogMsg(res.message)
      handleClickOpenResponseDialog()
    })
    // handleDialogClose()
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
        <IconButton edge="start" color="inherit" onClick={() => { props.setStateFromChild({hiddenState:true}) }} >
          <ArrowBackIcon />
        </IconButton>

        <Avatar alt={props.state.chatRooms[props.state.currentChatListID].logo} src={props.state.chatRooms[props.state.currentChatListID].logo} />

        <Typography>{props.state.chatRooms[props.state.currentChatListID].name}</Typography>
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
            defaultValue={props.state.chatRooms[props.state.currentChatListID].name}
            onChange={(event) => {
              setInputName(event.target.value);
            }}
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
            defaultValue={props.state.chatRooms[props.state.currentChatListID].description}
            onChange={(event) => {
              setInputDescription(event.target.value);
            }}
          />

          <DialogActions>
            <Button onClick={handleClickSave} color="primary">
              Update
          </Button>
            {/* <Button onClick={handleClickCreate} color="primary">
            Create
          </Button> */}
          </DialogActions>

          <Divider />

          <Typography variant="subtitle2">
            Participants
            </Typography>

          <ParticipantPanel
            state={props.state}
            setStateFromChild={props.setStateFromChild}
          />

          <Fab alignItems="center" color="primary" size="small" aria-label="add"
          // disabled={true}
          className={classes.fabButton}
          >
            <AddIcon onClick={()=>{setAddNewParticipantOpen(true);}}/>
          </Fab>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <ResponseDialog
        open={openResponseDialog}
        handleCloseResponseDialog={handleCloseResponseDialog}
        title={responseDialogMsg}
      // description={"Group Created Successfully"}
      />

      <AddNewParticipant
        open={addNewParticipantOpen}
        setAddNewParticipantOpen={setAddNewParticipantOpen}
        state={props.state}
        setStateFromChild={props.setStateFromChild}
      />
    </AppBar>
  );
}

export default ChatWindowTopAppBar
