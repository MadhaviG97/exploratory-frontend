import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import {


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
import ResponseDialog from '../ResponseDialog'

const AddNewParticipant = (props) => {


  const [state,setState] = React.useState({
    collaborators: [],
    allCollaborators: [],
  })

  const [inputValue, setInputValue] = React.useState('');
  const [loading,setLoading]= React.useState(true);

  const [openResponseDialog, setOpenResponseDialog] = React.useState(false);
  const [responseDialogMsg, setResponseDialogMsg] = React.useState("")


  React.useEffect(() => {
    const fetchData = async () => {

      props.state.client.allResearchers(res => {
       
        props.state.client.getChatroomParticipants(props.state.chatRooms[props.state.currentChatListID].chat_id, async (res2)=>{
          var participantSet = new Set()
          await res2.forEach(p=>{
            participantSet.add(p.user_id)
          })
          var collaboratorsArray=[]
          
       
          await res.forEach(p=>{
            if(!participantSet.has(p.id)){
              collaboratorsArray.push(p)
            }
          })
        
          setState({
            ...state,
            allCollaborators: collaboratorsArray,
          });
        })

      })

    }
    fetchData()

  }, [props.state.currentChatID]);

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
    const newList = [];
    values.forEach((value) => {
      newList.push(value.id);
    });
    setState({
      ...state,
      collaborators: newList,
    });
  };
  

  const handleDialogClose = () => {
    props.setAddNewParticipantOpen(false);
  };

  const handleAddNewParticipants = () => {
    // console.log("adding",state.collaborators)
    var usersInfo={
      chat_id:props.state.currentChatID,
      participants:state.collaborators,
    }
    props.state.client.addMoreParticipants(usersInfo,(res)=>{
      setResponseDialogMsg(res.message)
      handleClickOpenResponseDialog()
    })
    // handleDialogClose()
  }


  const handleClickOpenResponseDialog = () => {
    setOpenResponseDialog(true);
  };

  const handleCloseResponseDialog = () => {
    setOpenResponseDialog(false);
    setState({
      ...state,
      collaborators: [],
    });
    props.state.client.getChatrooms((err, res) => {
      props.setStateFromChild({ chatRooms: res })
    })
    props.setStateFromChild({globalReload:!props.state.globalReload})
    handleDialogClose()
  };

 
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  
    return (
      <Dialog open={props.open} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Participants</DialogTitle>
        <DialogContent>
  
         
  
          {/* <AddParticipant
          handleSearchResearchers={props.handleSearchResearchers}
          handleAllResearchers={props.handleAllResearchers}
          state={state}
          setState={setState}
        /> */}
  
          <Grid item xs={12}>

            <Autocomplete
              multiple
              id="fixed-participant-demo"
              options={[...state.allCollaborators]}
  
              onChange={(event, value) => {
                onCollaboratorChange(value);
              }}
              getOptionLabel={(option) =>
                option.first_name.concat(" ").concat(option.last_name)
              }
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                 
                    <Chip
                    label={option.first_name.concat(" ").concat(option.last_name)}
                    {...getTagProps({ index })}
  
                    avatar={
                      <Avatar
                        alt="propic"
                        src={
                          option.profile_picture
                        }
                      />
                    }
                  />
                
                ))
              }
             
              renderOption={(option, { selected }) => (
                option ? (
                  <React.Fragment>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                      color="primary"
                    />
                    <List >
                      {/* className={classes.root} */}
                      <ListItem id="participantItem">
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
                  </React.Fragment>
                ) : null
              )}
              style={{ width: 500 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Participants"
                  name="participants"
                  variant="outlined"
                  onChange={handleInputChange}
                />
              )}
            />
          </Grid>
  
        </DialogContent>
  
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Back
        </Button>
          <Button onClick={handleAddNewParticipants} color="primary">
            Add
        </Button>
        </DialogActions>


        <ResponseDialog
        open={openResponseDialog}
        handleCloseResponseDialog={handleCloseResponseDialog}
        title={responseDialogMsg}
      // description={"Group Created Successfully"}
      />

      </Dialog>
    )
  
}

export default AddNewParticipant