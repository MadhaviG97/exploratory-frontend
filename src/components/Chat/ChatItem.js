import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';

import { Divider, ListItemSecondaryAction } from '@material-ui/core'

import CheckIcon from '@material-ui/icons/Check';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import TimerIcon from '@material-ui/icons/Timer';

const ChatItem = (props) => {

    return (

        <div>
            <ListItem alignItems="flex-start"
                button onClick={() => {
                    props.setStateFromChild({ currentChatID: props.chatDetails.chat_id })
                    props.setStateFromChild({ hiddenState: false })
                    props.setStateFromChild({ currentChatListID: props.ind })
                }}
                style={{ outerWidth: '100%' }}>
                <ListItemAvatar>
                    <Avatar alt="Profile Picture" src={props.chatDetails.logo} />
                </ListItemAvatar>
                <ListItemText primary={props.chatDetails.name}
                    secondary={"Today 8:30 pm"}
                />

            </ListItem>
            <Divider variant="inset" component="li" />

        </div>

    )
}

export default ChatItem