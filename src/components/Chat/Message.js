import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';

import { Divider, ListItemSecondaryAction, Typography } from '@material-ui/core'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core'

import CheckIcon from '@material-ui/icons/Check';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import TimerIcon from '@material-ui/icons/Timer';
import InfoIcon from '@material-ui/icons/Info';

// import MoreIcon from '@material-ui/icons/MoreVert';
import MoreIcon from '@material-ui/icons/More';
import FeedbackIcon from '@material-ui/icons/Feedback';
import Chip from "@material-ui/core/Chip";
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { getDateTime } from './Utility/DTUtility';
import HtmlTooltip from './HtmlToolTip'

const Message = ({ msg, client }) => {

    const [open, setOpen] = React.useState(false);
    const [seenParticipants, setSeenParticipants] = React.useState([])
    const [deliverParticipants, setDeliverParticipants] = React.useState([])

    const handleClickDialogOpen = () => {
        setOpen(true);
        loadSeenParticipants()
        loadDeliverParticipants()
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    const loadSeenParticipants = () => {
        client.getSeen(msg.chat_id, msg.id, (res) => {
            if (res.length > 0) {
                setSeenParticipants(res)
            }
        })
    }

    const loadDeliverParticipants = () => {
        client.getDeliver(msg.chat_id, msg.id, (res) => {
            console.log("deliver", res)
            if (res.length > 0) {
                setDeliverParticipants(res)
            }
        })
    }

    return (
        <div>
            <ListItem alignItems="flex-start" button>
                <HtmlTooltip
                    title={
                        <React.Fragment>
                            <Typography varient="body" color="inherit">Name: {msg.first_name.concat(" ".concat(msg.last_name))}</Typography>
                            <Typography varient="body" color="inherit">Email: {msg.email}</Typography>

                        </React.Fragment>
                    }
                >
                    <ListItemAvatar>
                        <Avatar alt={msg.first_name} src={msg.profile_picture} />
                    </ListItemAvatar>
                </HtmlTooltip>

                <ListItemText primary={msg.message}
                    secondary={getDateTime(msg.message_time)}
                />

                <ListItemSecondaryAction>
                    <IconButton edge="end">
                        <InfoIcon aria-haspopup="true" onClick={handleClickDialogOpen} />
                    </IconButton>
                </ListItemSecondaryAction>

                <Dialog open={open} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Message Status</DialogTitle>
                    <DialogContent>

                        <Typography variant="subtitle2">Seen Participants</Typography>

                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">

                                <TableBody>
                                    {seenParticipants.map((option) => (
                                        <TableRow key={option.user_id}>
                                            <TableCell component="th" scope="row">
                                                <Chip
                                                    label={option.first_name.concat(" ").concat(option.last_name).concat(" - ").concat(option.institution)}
                                                    color="primary"
                                                    avatar={<Avatar alt="propic" src={option.profile_picture} />}
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <Chip
                                                    label={getDateTime(option.seen_time)}
                                                    color="secondary"
                                                    avatar={<AccessTimeIcon />}
                                                />
                                            </TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>



                        <Typography style={{ marginTop: '30px' }} variant="subtitle2">Delivered Participants</Typography>

                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">

                                <TableBody>
                                    {deliverParticipants.map((option) => (
                                        <TableRow key={option.user_id}>
                                            <TableCell component="th" scope="row">
                                                <Chip
                                                    label={option.first_name.concat(" ").concat(option.last_name).concat(" - ").concat(option.institution)}
                                                    color="primary"
                                                    avatar={<Avatar alt="propic" src={option.profile_picture} />}
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <Chip
                                                    label={getDateTime(option.deliver_time)}
                                                    color="secondary"
                                                    avatar={<AccessTimeIcon />}
                                                />
                                            </TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </DialogContent>

                </Dialog>

            </ListItem>
            <Divider variant="inset" component="li" />

        </div>
    )
}

export default Message