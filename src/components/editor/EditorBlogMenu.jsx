import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import { useHistory } from "react-router-dom";
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
const fileImage=process.env.PUBLIC_URL + '/images/fileFolder/fileAvatar.png'
const folderImage=process.env.PUBLIC_URL + '/images/fileFolder/grey-folder-full-icon-png-5.png'
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
    fontSize:18,
    color:'inherit'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

export default function FolderMenu(props) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div>
        
    <List className={classes.root}>
        <ListItem alignItems="flex-start">  
            <ListItemText
            primary={
                <Paper component="form" className={classes.root}>
                    <InputBase
                        className={classes.input}
                        placeholder="Search Drive"
                        inputProps={{ 'aria-label': 'search drive' }}
                    />
                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
            }
            
            />
        </ListItem>
        <Divider variant="fullWidth" />
        <ListItem alignItems="flex-start">
            <ListItemAvatar >
            <Avatar variant='square'alt="Cindy Baker" src={fileImage} />
            </ListItemAvatar>
            <ListItemText
                primary={
                    <React.Fragment>
                        <Button
                            backgroundColor='#b2beb5'
                            height={50}
                            component="label"
                            //onClick={props.history.push('/document/create')}
                            >
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >   
                            Create New
                            </Typography>
                            
                        </Button>
                    </React.Fragment>
                }
            >
            </ListItemText>
            
        </ListItem>
        <Divider variant="fullWidth"  />
        <ListItem alignItems="flex-start">
            
            <ListItemText
            primary={
                <React.Fragment>
                <Button
                    backgroundColor='#b2beb5'
                    component="label"
                    
                    >
                    <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                    >   
                    Compare Two Documents
                    </Typography>
                    
                </Button>
            </React.Fragment>
            }
            
            />
        </ListItem>
        
        </List>
    </div>
  );
}
