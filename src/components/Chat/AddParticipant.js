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


const AddParticipant = (props)=>{

  const [state, setState] = React.useState({
    title: "",
    description: "",
    currentuser: null,
    collaborators: [],
    tags: [],
    allCollaborators:[],
  });

  const [inputValue, setInputValue] = React.useState('');

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    // console.log(state.title, state.description);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    console.log(event.target.value)
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

  const handleSubmit = (e, cb) => {
    // const formData = {
    //   title: state.title,
    //   description: state.description,
    //   creator: state.currentuser.id,
    //   collaborators: state.collaborators,
    //   tags: state.tags,
    // };

    // console.log(formData);
    // dispatch(createResearch(formData))
    //   .then((result) => {
    //     cb();
    //   })
    //   .catch((e) => console.log(e));
  };

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  React.useEffect(async () => {
  
    props.handleAllResearchers(res=>{
      setState({
        ...state,
        allCollaborators: res,
      });
    })
    // props.handleSearchResearchers(inputValue,(res)=>{
    //   console.log(res)
    //   setState({
    //         ...state,
    //         allCollaborators: res,
    //       });
      
    // })

  }, [inputValue]);

  return(

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
                      src={"../images/profile-pictures/".concat(
                        option.profile_picture
                      )}
                    />
                  }
                />
              ))
            }
            renderOption={(option, { selected }) => (
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
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar
                        src={"../images/profile-pictures/".concat(
                          option.profile_picture
                        )}
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
            )}
            style={{ width: 500 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Collaborators"
                name="collaborators"
                variant="outlined"
                onChange={handleInputChange}
              />
            )}
          />
        </Grid>
  )
}

export default AddParticipant
