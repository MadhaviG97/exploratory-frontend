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
import { Container, GridList, InputBase, GridListTile, Button, Grid } from '@material-ui/core'
import Icon from '@material-ui/core/Icon';
import Message from './Message'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Link from '@material-ui/core/Link';

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
    appBarBottom: {
      top: 0,
      bottom: 'auto',
      height: 'auto',
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
console.log(props)
  const [input, setInput] = useState("")
  const [loadMoreDisabled, setLoadMoreDisabled] = React.useState(false)
  const messagesEndRef = React.useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

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
    if (input == "") return
    var date = new Date()
    var newMessege = {
      chat_id: props.state.currentChatID,
      message: input,
      message_time: formatDate(date),
      sender_id: props.state.user_id
    }
    setInput("")
    props.state.client.sendMessage(newMessege, (res) => console.log("res is", res))
    scrollToBottom()
  }

  const onFocus = () => {
    props.setStateFromChild({ tabInfocus: true })
  };


  const onBlur = () => {
    props.setStateFromChild({ tabInfocus: false })
  };

  const clickLoadMore = (event) => {
    event.preventDefault();
    props.state.client.getMoreMessages(props.state.currentChatID, props.state.chatRooms[props.state.currentChatListID].chatMesseges[0].id, (res) => {

      if (res.length > 0) {
        var chatRoomsCopy = props.state.chatRooms.slice()
        chatRoomsCopy[props.state.currentChatListID].chatMesseges = res.concat(props.state.chatRooms[props.state.currentChatListID].chatMesseges)
        props.setStateFromChild({ chatRooms: chatRoomsCopy }
        )
      }
      else {
        setLoadMoreDisabled(true)
      }
    })
  }

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
      // scrollToBottom()
    }

  })

  React.useEffect(() => {
    if (props.state.tabInfocus) {
      scrollToBottom()
      setLoadMoreDisabled(false)
    }

  }, [props.state.hiddenState])

  React.useEffect(() => {
    onFocus()
  }, [])
  // console.log("aaaaaaaaaaaaaaa");
  // console.log(props.state.currentChatListID)
  if (props.state.currentChatListID==null) {
    return (<div />)
  }

  return (

    <div id='chatWindow' className={classes.upperRoot} hidden={props.state.hiddenState}>
      <div className={classes.root}>

        <ChatWindowTopAppBar
          state={props.state}
          setStateFromChild={props.setStateFromChild}
        />

        <GridList cellHeight={160} className={classes.gridList} cols={1}>
          <div >
            <CssBaseline />
            <Paper square className={classes.paper}>

              <List disabled className={classes.list}>

                <Grid container justify="center">
                  <Button size="small" color="primary" onClick={clickLoadMore}
                    disabled={loadMoreDisabled || props.state.chatRooms[props.state.currentChatListID].chatMesseges.length < 20}>
                    {loadMoreDisabled || props.state.chatRooms[props.state.currentChatListID].chatMesseges.length < 20
                      ? "Begining of the Chat" : "Load More Messages"}
                  </Button>
                </Grid>

                {
                  props.state.currentChatListID!=null ? (
                    props.state.chatRooms[props.state.currentChatListID].chatMesseges.map((currentMsg, ind) => (
                      currentMsg ?
                        <Message
                          key={currentMsg.id}
                          msg={currentMsg}
                          client={props.state.client}
                        />
                        : null
                    ))
                  ) : null
                }
                <div ref={messagesEndRef} />

              </List>
            </Paper>

          </div>
        </GridList>

        <AppBar position="relative" color="primary" className={classes.appBarBottom}>
          <Toolbar>

            <div className={classes.search}>
              <InputBase
                id="msgBox"
                placeholder="Send..."
                onChange={onInput}
                value={input}
                // multiline={true}
                // rows={3}
                onKeyPress={e => (e.key === 'Enter' ? onSendMessage() : null)}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <Button
              id="sendButton"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={input == ""}
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
