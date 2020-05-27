import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core'
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import ResponseDialog from '../ResponseDialog'

const DirrectChatDialog = (props) => {

    const [state, setState] = React.useState({
        collaborators: null,
        allCollaborators: [],
        user_id: props.state.user_id
    });

    const [inputValue, setInputValue] = React.useState('');
    const [openResponseDialog, setOpenResponseDialog] = React.useState(false);
    const [responseDialogMsg, setResponseDialogMsg] = React.useState("")

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });

    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const onCollaboratorChange = (values) => {

        setState({
            ...state,
            collaborators: values,
        });
    };

    const handleClickOpenResponseDialog = () => {
        setOpenResponseDialog(true);
    };

    const handleCloseResponseDialog = () => {
        setOpenResponseDialog(false);
        props.state.client.getChatrooms((err, res) => {
            props.setStateFromChild({ chatRooms: res })
        })
    };

    const makeNewChat = async () => {

        await props.state.client.getDirrectChat(state.collaborators.id, state.user_id, async(res) => {
            if (res) {
                await props.state.chatRooms.forEach((chatRoom, ind) => {
                    if (chatRoom.chat_id == res.chat_id) {
                        console.log("chat", chatRoom)
                        props.setStateFromChild({
                            hiddenState: false,
                            currentChatID: chatRoom.chat_id,
                            currentChatListID: ind,
                        })

                        setState({
                            ...state,
                            collaborators: null
                        });
                        props.handleDirrectChatDialogClose()
                    }
                })

            }
            else{
                var participants = [{user_id: state.user_id, isAdmin: 1,},
                    {user_id: state.collaborators.id,isAdmin: 1,}]
        
                var chatDetails = {
                    name: "Dirrect Chat",
                    description: "Dirrect Chat des",
                    creator_id: state.user_id,
                    participants: participants,
                    isDirrect: 1
                }

                await props.state.client.createChatroom(chatDetails, async (res) => {
                    if(res.success){

                        await props.state.client.getChatrooms(async (err, res) => {
                            await props.setStateFromChild({ chatRooms: res })

                            await props.state.client.getDirrectChat(state.collaborators.id, state.user_id, (res2) => {
                                if (res2) {
                                    res.forEach((chatRoom, ind) => {
                                        if (chatRoom.chat_id == res2.chat_id) {
                                 
                                            props.setStateFromChild({
                                                hiddenState: false,
                                                currentChatID: chatRoom.chat_id,
                                                currentChatListID: ind,
                                            })
                    
                                            setState({
                                                ...state,
                                                collaborators: null
                                            });
                                            props.handleDirrectChatDialogClose()
                                        }
                                    })
                    
                                }
                            })
                          })
                          
                        
                    }
                    else{
                        setResponseDialogMsg(res.message)
                        handleClickOpenResponseDialog()
                    }
                    
                })
            }
        })
      
        
        await setState({
            ...state,
            collaborators: null
        })
        props.handleDirrectChatDialogClose()
    }

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    React.useEffect(() => {
        const fetchData = async () => {

            props.state.client.allResearchers(res => {
                setState({
                    ...state,
                    allCollaborators: res,
                });
            })

        }
        fetchData()

    }, []);



    return (
        <div>
            <Dialog open={props.openDirectChatDialog}
                onClose={() => {
                    setState({
                        ...state,
                        collaborators: null
                    });
                    props.handleDirrectChatDialogClose()
                }} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Start a Dirrect Chat</DialogTitle>
                <DialogContent>


                    <Typography style={{ marginBottom: '20px' }} variant="subtitle2">Select a Researcher</Typography>

                    <Grid item xs={12}>
                        <Autocomplete

                            id="fixed-researcher-demo"
                            options={[...state.allCollaborators]}

                            onChange={(event, value) => {
                                onCollaboratorChange(value);
                            }}
                            getOptionLabel={(option) =>
                                option.first_name.concat(" ").concat(option.last_name)
                            }
                            renderOption={(option, { selected }) => (
                                option.id != state.user_id ? (

                                    <List >

                                        <ListItem>
                                            <ListItemAvatar>
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
                                            />
                                        </ListItem>
                                    </List>

                                ) : null
                            )}
                            style={{ width: 500 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Researcher"
                                    name="researcher"
                                    variant="outlined"
                                    onChange={handleInputChange}
                                />
                            )}
                        />
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setState({
                            ...state,
                            collaborators: null
                        });
                        props.handleDirrectChatDialogClose()
                    }}
                        color="primary">
                        Cancel
          </Button>
                    <Button onClick={makeNewChat} disabled={!state.collaborators} color="primary">
                        Start
          </Button>
                </DialogActions>
            </Dialog>
            <ResponseDialog
                open={openResponseDialog}
                handleCloseResponseDialog={handleCloseResponseDialog}
                title={responseDialogMsg}
            // description={"Group Created Successfully"}
            />
        </div>
    )
}

export default DirrectChatDialog