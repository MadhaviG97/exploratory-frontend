import React from 'react';
import Grid from '@material-ui/core/Grid';
import {

  Typography,
  TextField,
  Paper,
  Button,
  Box,
} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 200,
  }
}));

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);


const ParticipantPanel = (props) => {

  const classes = useStyles();
  const [participants, setParticipants] = React.useState([])
  const [currentUser,setCurrentUser]= React.useState({})
  const [reload,setReload]=React.useState(true)

  React.useEffect(() => {

    const fetchData = async () => {
      props.state.client.getChatroomParticipants(props.state.chatRooms[props.state.currentChatListID].chat_id, (res) => {

        setParticipants(res)
        res.forEach(user=>{
          if(user.user_id==props.state.user_id){
            setCurrentUser(user)
          }
        })
        
      })

    }
    fetchData()
  }, [reload,props.state.globalReload])


  const handleAdminSwitchChange = (event) => {
    var userUpdate={
      chat_id:props.state.currentChatID,
      user_id:event.target.name,
      isAdmin:event.target.checked
    }
    props.state.client.changeAdmin(userUpdate, (res) => {
      setReload(!reload)
    })
  };
  
  return (

    <List className={classes.root} >

      {participants.map(option => (
        option?(
          <ListItem>
          {/* <ListItemAvatar>
            <Avatar
              src={
                option.profile_picture
              }
            />
          </ListItemAvatar>
          <ListItemText
            primary={option.first_name.concat(" ").concat(option.last_name)}
            secondary={option.institution}
          /> */}

          <HtmlTooltip
            title={
              <React.Fragment>
                <Typography varient="body" color="inherit">Email: {option.email}</Typography>

              </React.Fragment>
            }
          >

            <Chip
              label={option.first_name.concat(" ").concat(option.last_name).concat(" - ").concat(option.institution)}

              avatar={
                <Avatar
                  alt="propic"
                  src={
                    option.profile_picture
                  }
                />
              }
            />
          </HtmlTooltip>
          <FormControlLabel
        control={
          <Switch
            checked={option.isAdmin}
            onChange={handleAdminSwitchChange}
            name={option.user_id}
            disabled={(option.user_id==currentUser.user_id)||(currentUser.isAdmin==0)}
            color="primary"
          />
        }
        label="Admin"
      />
        </ListItem>
        ):null
        
      ))}
    </List>

  )
}

export default ParticipantPanel
