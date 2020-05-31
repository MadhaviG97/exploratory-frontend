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
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import history from '../../history'


const fileImage=process.env.PUBLIC_URL + '/images/fileFolder/plus2.png'




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
  const group=props.group
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
        
            <ListItemText
                primary={
                    <React.Fragment>
                        <Button
                            backgroundcolor='#b2beb5'
                            height={50}
                            component="label"
                            onClick={()=>history.push(`/document/${group}/create`)}
                            //onClick={props.history.push('/document/create')}
                            >
                            <ListItemAvatar >
                                <Avatar alt="add" src={fileImage} />
                            </ListItemAvatar>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >   
                            Create New
                            </Typography>
                            <Box p={0.2}/>
                            
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
                    onClick={()=>history.push(`/document/${group}/compare`)}
                    
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
