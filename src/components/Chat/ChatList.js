import React from 'react';
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
import ChatItem from './ChatItem'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
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

const ChatList = (props) => {
  const classes = useStyles();

  return (

    <div className={classes.upperRoot} hidden={!props.controls.hiddenState}>
      <div className={classes.root}>
        
        <ChatListTopAppBar 
        handleSearchResearchers={props.state.client.searchResearchers}
        handleAllResearchers={props.state.client.allResearchers}
        user_id={props.state.user_id}
        client={props.state.client}
        state={props.state}
        setStateFromChild={props.setStateFromChild}
        />
       
        <GridList cellHeight={160} className={classes.gridList} cols={1}>
          <React.Fragment>
            <CssBaseline />
            <Paper square className={classes.paper} style={{ width: '100%' }}>

              <List className={classes.list} style={{ width: '100%' }}>

                {
                  props.chatRooms.map(currentChat => (
                    currentChat ? <ChatItem
                      key={currentChat.chat_id}
                      controls={props.controls}
                      chatDetails={currentChat}
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
