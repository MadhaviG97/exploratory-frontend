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

  return (

    <div className={classes.upperRoot} hidden={!props.state.hiddenState}>
      <div className={classes.root}>

        <ChatListTopAppBar
          state={props.state}
          setStateFromChild={props.setStateFromChild}
        />

        <GridList cellHeight={160} className={classes.gridList} cols={1}>
          <React.Fragment>
            <CssBaseline />
            <Paper square className={classes.paper} style={{ width: '100%' }}>

              <List className={classes.list} style={{ width: '100%' }}>

                {
                  props.state.chatRooms.map((currentChat, ind) => (
                    currentChat ? <ChatItem
                      key={currentChat.chat_id}
                      state={props.state}
                      setStateFromChild={props.setStateFromChild}
                      chatDetails={currentChat}
                      ind={ind}
                    /> : null
                  ))
                }
              </List>
            </Paper>

          </React.Fragment>
        </GridList>

      </div>
    </div>
  );
}

export default ChatList
