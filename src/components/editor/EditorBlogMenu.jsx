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

import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import history from '../../history'


const fileImage=process.env.PUBLIC_URL + '/images/fileFolder/fileAvatar.png'




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
  const [name,setName]=React.useState('');
  
  const onChange = (event) => {
    
        props.onSearchChange(event.target.value);
    
  };
  
  return (
    <div>
        
    <List className={classes.root}>
        <ListItem alignItems="flex-start">  
            <ListItemText
            primary={
                <Paper component="form" className={classes.root}>
                    <InputBase
                        className={classes.input}
                        placeholder="Search Documents"
                        inputProps={{ 'aria-label': 'search drive' }}
                        onChange={onChange}
                    />
                    <IconButton type="submit" className={classes.iconButton} aria-label="search" onClick={props.handleSearch}>
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
                            backgroundcolor='#b2beb5'
                            height={50}
                            component="label"
                            onClick={()=>history.push('/document/create')}
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
                    backgroundcolor='#b2beb5'
                    component="label"
                    onClick={()=>history.push('/document/compare')}
                    
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
