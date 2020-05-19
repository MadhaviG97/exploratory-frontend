import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';

import  {Divider, ListItemSecondaryAction} from '@material-ui/core'

import CheckIcon from '@material-ui/icons/Check';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import TimerIcon from '@material-ui/icons/Timer';

const Message =({msg}) => {

    const getDateTime=(timestamp)=>{
        var a = new Date(timestamp);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' - ' + hour + ':' + min
        return time;
        // console.log(date)
    }
    return(
        <React.Fragment>
            <ListItem alignItems="flex-start" button>
                <ListItemAvatar>
                <Avatar alt={msg.first_name} src={msg.profile_picture} />
                </ListItemAvatar>
                <ListItemText primary={msg.message} 
                    secondary={getDateTime(msg.message_time)}
                />

                <ListItemSecondaryAction>
                    <IconButton edge="end">
                        {/* <CheckIcon /> */}
                        {/* <DoneAllIcon/> */}
                        {/* <HourglassEmptyIcon/> */}
                        <TimerIcon/>
                    </IconButton>
                </ListItemSecondaryAction>

            </ListItem>
            <Divider variant="inset" component="li" />

        </React.Fragment>
    )
}

export default Message