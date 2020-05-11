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
// props.state.client.searchResearchers("Damika",(res)=>{console.log(res)})
    
  return (

    <div className={classes.upperRoot} hidden={!props.controls.hiddenState}>
      <div className={classes.root}>
        
        <ChatListTopAppBar 
        handleSearchResearchers={props.state.client.searchResearchers}
        handleAllResearchers={props.state.client.allResearchers}
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


{
  //   <CssBaseline />

  //         <Paper square className={classes.paper}>
  //             <Typography className={classes.text} variant="h5" gutterBottom>
  //             Inbox
  //             </Typography>
  //             <List className={classes.list}>
  //             {messages.map(({ id, primary, secondary, person }) => (
  //                 <React.Fragment key={id}>
  //                 {id === 1 && <ListSubheader className={classes.subheader}>Today</ListSubheader>}
  //                 {id === 3 && <ListSubheader className={classes.subheader}>Yesterday</ListSubheader>}
  //                 <ListItem button>
  //                     <ListItemAvatar>
  //                     <Avatar alt="Profile Picture" src={person} />
  //                     </ListItemAvatar>
  //                     <ListItemText primary={primary} secondary={secondary} />
  //                 </ListItem>
  //                 </React.Fragment>
  //             ))}
  //             </List>
  //         </Paper>
  //        { <AppBar position="fixed" color="primary" className={classes.appBar} style={{width:'300px'}}>
  //             <Toolbar>
  //             <IconButton edge="start" color="inherit" aria-label="open drawer">
  //                 <MenuIcon />
  //             </IconButton>
  //             <Fab color="secondary" aria-label="add" className={classes.fabButton}>
  //                 <AddIcon />
  //             </Fab>
  //             <div className={classes.grow} />
  //             <IconButton color="inherit">
  //                 <SearchIcon />
  //             </IconButton>
  //             <IconButton edge="end" color="inherit">
  //                 <MoreIcon />
  //             </IconButton>
  //             </Toolbar>
  //         </AppBar>}
}