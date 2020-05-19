import React, { useState } from 'react';
import { createStyles, Theme, fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Container, GridList, InputBase, GridListTile, Button } from '@material-ui/core'
import Icon from '@material-ui/core/Icon';
import Message from './Message'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import ChatWindowTopAppBar from './ChatWindow/ChatWindowTopAppBar'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      width: 300,
      height: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    upperRoot: {
      width: 300,
      height: '100%',
    },
    gridList: {
      width: 300,
      height: `calc(100% - ${125}px)`,
    },
    text: {
      padding: theme.spacing(2, 2, 0),
    },
    paper: {
      paddingBottom: 50,
    },
    list: {
      marginBottom: theme.spacing(2),
    },
    subheader: {
      backgroundColor: theme.palette.background.paper,
    },
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
      top: -30,
      left: 0,
      right: 0,
      margin: '0 auto',
    },

    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',

    },

    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,

    },

    // 
  }),
);




const ChatWindow = (props) => {
  const classes = useStyles();

  const [input, setInput] = useState("")

  const onInput = (e) => {
    setInput(e.target.value)
  }

  const formatDate = (date1) => {

    var year = date1.getFullYear(),
      month = date1.getMonth() + 1,
      day = date1.getDate(),
      hours = date1.getHours(),
      minutes = date1.getMinutes(),
      seconds = date1.getSeconds();

    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
  }
  const onSendMessage = () => {
    var date = new Date()
    var newMessege = {
      chat_id: props.state.currentChatID,
      message: input,
      message_time: formatDate(date),
      sender_id: props.state.user_id
    }
    setInput("")
    props.state.client.sendMessage(newMessege, (res) => console.log("res is", res))
  }

  const onFocus = () => {
    props.setStateFromChild({ tabInfocus: true })
  };


  const onBlur = () => {
    props.setStateFromChild({ tabInfocus: false })
  };

  React.useEffect(() => {
    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);
    // Specify how to clean up after this effect:
    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);
    };
  });

  React.useEffect(() => {

    if (!props.state.hiddenState && props.state.tabInfocus) {

      props.state.chatRooms[props.state.currentChatListID].chatMesseges.forEach(msg => {
        if (msg.id > props.state.chatRooms[props.state.currentChatListID].lastSeenACK) {
          var MsgInfo = {
            chat_id: props.state.currentChatID,
            user_id: props.state.user_id,
            message_id: msg.id
          }
          props.state.client.markSeen(MsgInfo, (res) => {

            if (res) {
              props.setStateFromChild((state) => {
                state.chatRooms[props.state.currentChatListID].lastSeenACK = Math.max(state.chatRooms[props.state.currentChatListID].lastSeenACK, msg.id)
                return ({
                  chatRooms: state.chatRooms
                })
              })
            }
          })
        }
      })
    }

  })
  
  React.useEffect(() => {
    onFocus()
  }, [])

  if (!props.state.currentChatListID) {
    return (<div />)
  }
  
  return (

    <div className={classes.upperRoot} hidden={props.state.hiddenState}>
      <div className={classes.root}>

        <ChatWindowTopAppBar
          state={props.state}
          setStateFromChild={props.setStateFromChild}
        />

        <GridList cellHeight={160} className={classes.gridList} cols={1}>
          <div >
            <CssBaseline />
            <Paper square className={classes.paper}>

              <List className={classes.list}>

                {
                  props.state.currentChatListID ? (
                    props.state.chatRooms[props.state.currentChatListID].chatMesseges.map((currentMsg, ind) => (
                      currentMsg ?
                        <Message
                          key={currentMsg.id}
                          msg={currentMsg}
                        />
                        : null
                    ))
                  ) : null
                }

              </List>
            </Paper>

          </div>
        </GridList>

        <AppBar position="relative" color="primary" className={classes.appBar}>
          <Toolbar>

            <div className={classes.search}>
              <InputBase
                placeholder="Send..."
                onChange={onInput}
                value={input}
                onKeyPress={e => (e.key === 'Enter' ? onSendMessage() : null)}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={onSendMessage}
              endIcon={<Icon>send</Icon>}
            >
            </Button>

          </Toolbar>
        </AppBar>
      </div>
    </div>


  );
}


export default ChatWindow
