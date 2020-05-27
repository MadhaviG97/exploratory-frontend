import React from 'react';
import { createStyles, Theme, fade, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import { Container, GridList, InputBase, GridListTile, Button } from '@material-ui/core'
import ChatItem from './ChatItem'
import ChatListTopAppBar from './ChatListTopAppBar'

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
      // height: 400,
      height: '100%',
    },
    paper: {
      paddingBottom: 50,
    },
    list: {
      marginBottom: theme.spacing(2),
    },
  }),
);

const ChatList = (props) => {

  const classes = useStyles();
  var chatRoomCopy = []

  props.state.chatRooms.forEach((chatRoom, ind) => {
    chatRoomCopy.push(Object.assign({ ind: ind }, chatRoom))
  })

  React.useEffect(() => {

    const sendDeliverACK = async () => {
      var change=false
      await props.state.chatRooms.forEach((chatRoom, ind) => {
        if (chatRoom.chatMesseges.length > 0 && chatRoom.lastDeliverACK < chatRoom.chatMesseges[chatRoom.chatMesseges.length - 1].id) {
          chatRoom.chatMesseges.forEach((msg) => {
            var MsgInfo = {
              chat_id: chatRoom.chat_id,
              user_id: props.state.user_id,
              message_id: msg.id
            }

            change=true
            props.state.client.markDeliver(MsgInfo, (res) => { })
          })
        }
      })

      if(change){
        props.setStateFromChild((state) => {
        
          state.chatRooms.forEach((chatRoom, ind) => {
            if (chatRoom.chatMesseges.length > 0) {
              state.chatRooms[ind].lastDeliverACK = chatRoom.chatMesseges[chatRoom.chatMesseges.length - 1].id
            }
          })

          return ({
            chatRooms: state.chatRooms
          })
  
        })
      }
    }
    sendDeliverACK()
  }, [props.state.chatRooms])

  return (

    <div className={classes.upperRoot} hidden={!props.state.hiddenState}>
      <div className={classes.root}>

        <ChatListTopAppBar
          state={props.state}
          setStateFromChild={props.setStateFromChild}
        />

        <GridList cellHeight={160} className={classes.gridList} cols={1}>
          <div>
            <CssBaseline />
            <Paper square className={classes.paper} style={{ width: '100%' }}>

              <List className={classes.list} style={{ width: '100%' }}>

                {
                  chatRoomCopy.sort((a, b) => {
                    const aTime = new Date(a.chatMesseges.length > 0 ? a.chatMesseges[a.chatMesseges.length - 1].message_time : a.joined_at)
                    const bTime = new Date(b.chatMesseges.length > 0 ? b.chatMesseges[b.chatMesseges.length - 1].message_time : b.joined_at)

                    return (aTime.getTime() > bTime.getTime() ? -1 : 1)
                  })
                    .map((currentChat, ind) => (
                      currentChat ? <ChatItem
                        key={100 - currentChat.chat_id}
                        state={props.state}
                        setStateFromChild={props.setStateFromChild}
                        chatDetails={currentChat}
                        ind={currentChat.ind}
                      /> : null
                    ))
                }
              </List>
            </Paper>

          </div>
        </GridList>

      </div>
    </div>
  );
}

export default ChatList
