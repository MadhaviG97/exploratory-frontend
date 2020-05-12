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


const ParticipantPanel = (props) => {
console.log(props)

  const[participants,setParticipants]=React.useState([])

  React.useEffect(()=>{
    console.log("running")
    const fetchData= async()=>{
      props.state.client.getChatroomParticipants(props.state.chatRooms[props.listID].chat_id,(res)=>{
        console.log(res)
        setParticipants(res)
      })
      
    }
    fetchData()
  },[])

  return (

    <List >
      {/* className={classes.root} */}
      <ListItem>
        {/* <ListItemAvatar>
          <Avatar
            src={
              option.profile_picture
            }
          />
        </ListItemAvatar>
        <ListItemText
          primary={option.first_name
            .concat(" ")
            .concat(option.last_name)}
          secondary={option.institution}
        /> */}
        <Typography>Participant1</Typography>
      </ListItem>

      <ListItem>

        <Typography>Participant1</Typography>
      </ListItem>

      <ListItem>

        <Typography>Participant1</Typography>
      </ListItem>
{/* 
      {props.state.chatRooms[props.listID].participants.forEach(element => (
        <ListItem>

          <Typography>element.first_name</Typography>
        </ListItem>
      ))} */}
    </List>

  )
}

export default ParticipantPanel
