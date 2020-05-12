import React from "react";
import {
  Grid,
  Typography,
  TextField,
  Paper,
  Button,
  Box,
} from "@material-ui/core";
import Navbar from "../../../components/Navbar/Navbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { useStyles } from "../../../assets/css/createResearch";
import Footer from "../../../components/Footer/Footer";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
//redux
import { useSelector } from "react-redux";
//routing
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";

const tags = [
  { id: 10001, title: "tags-1" },
  { id: 10002, title: "tags-2" },
  { id: 10003, title: "tags-3" },
  { id: 10004, title: "tags-4" },
  { id: 10005, title: "tags-5" },
];

export default function Form() {
  const classes = useStyles();
  let user = useSelector((state) => state.user);
  let history = useHistory();
  let location = useLocation();

  const AddressForm = () => {
    const [state, setState] = React.useState({
      title: "",
      description: "",
      currentuser: collaborators[0],
      collaborators: [collaborators[0]],
      tags: [],
    });

    const handleChange = (e) => {
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
      // console.log(state.title, state.description);
    };

    const onTagsChange = (values) => {
      const newList = [];
      values.forEach((value) => {
        newList.push(value.id);
      });
      setState({
        ...state,
        tags: newList,
      });
    };

    const onCollaboratorChange = (values) => {
      const newList = [];
      values.forEach((value) => {
        newList.push(value._id);
      });
      setState({
        ...state,
        collaborators: newList,
      });
    };

    const handleSubmit = (e) => {
      const formData = {
        title: state.title,
        description: state.description,
        creator: state.currentuser._id,
        collaborators: state.collaborators,
        tags: state.tags,
      };

      console.log(formData);

      axios
        .post(`/project/create-project`, formData)
        .then((response) => {
          var id = response.data.insertId;
          createFolder(id, "Final Paper");
          createFolder(id, "Related Images");
          createFolder(id, "Public Files");

          let { from } = location.state || {
            from: { pathname: `/project/viewproject/${id}` },
          };
          history.replace(from);
        })
        .catch((e) => console.log(e));
    };

    const createFolder = (project_id, folder_name) => {
      const token = localStorage.token;
      console.log(token);
      const variables = {
        group: project_id, //project_id
        name: folder_name,
        folder: "root",
      };

      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios.post("/drive/createfolder", variables, config).then((response) => {
        console.log(response);
        alert("Inserted");
      });
    };

    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;

    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" align="center">
            CREATE PROJECT
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="title"
            name="title"
            label="Project Title"
            fullWidth
            autoComplete="project title"
            variant="outlined"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="description"
            name="description"
            label="description"
            fullWidth
            autoComplete="project description"
            variant="outlined"
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            multiple
            id="fixed-collaborators-demo"
            options={[...collaborators]}
            defaultValue={[collaborators[0]]}
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
                  disabled={index === 0}
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
                <List className={classes.root}>
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
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            multiple
            id="fixed-tags-demo"
            options={tags}
            name="tags"
            onChange={(event, value) => {
              onTagsChange(value);
            }}
            getOptionLabel={(option) => option.title}
            renderInput={(state, getTagProps) =>
              state.map((option, index) => (
                <Chip
                  label={option.title}
                  {...getTagProps({ index })}
                  disabled={index === 0}
                />
              ))
            }
            style={{ width: 500 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="tags"
                name="tags"
                variant="outlined"
              />
            )}
          />
        </Grid>

        <Grid item xs={12} align="end">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Create Project
          </Button>
        </Grid>
      </Grid>
    );
  };

  return (
    <React.Fragment>
      <Box display="flex" flexDirection="column">
        <Box>
          <Navbar />
        </Box>
        <Box flexGrow="1" bgcolor="#eceff1">
          <main className={classes.layout}>
            <Paper className={classes.paper} elevation={5}>
              <AddressForm />
            </Paper>
          </main>
        </Box>
        <Box>
          <Footer />
        </Box>
      </Box>
    </React.Fragment>
  );
}

let collaborators = [
  {
    _id: 10001,
    first_name: "madhavi",
    last_name: "gayathri",
    institution: "University of Moratuwa",
    email: "mad@123.com",
    profile_picture: "avatar-1.jpg",
  },
  {
    _id: 10002,
    first_name: "malani",
    last_name: "fonseka",
    institution: "University of Moratuwa",
    email: "melani@123.com",
    profile_picture: "avatar-2.jpg",
  },
  {
    _id: 10003,
    first_name: "gamlath",
    last_name: "perera",
    institution: "University of Moratuwa",
    email: "gamlath@123.com",
    profile_picture: "avatar-3.jpg",
  },
  {
    _id: 10004,
    first_name: "peshaka",
    last_name: "dhananjaya",
    institution: "University of Moratuwa",
    email: "peshaka@123.com",
    profile_picture: "avatar-4.jpg",
  },
  {
    _id: 10005,
    first_name: "janith",
    last_name: "janith",
    institution: "University of Moratuwa",
    email: "janith@123.com",
    profile_picture: "avatar-5.jpg",
  },
  {
    _id: 10006,
    first_name: "eddie",
    last_name: "silva",
    institution: "University of Moratuwa",
    email: "eddie@123.com",
    profile_picture: "avatar-6.jpg",
  },
  {
    _id: 10007,
    first_name: "madhavi",
    last_name: "gayathri",
    institution: "University of Moratuwa",
    email: "madhavi@123.com",
    profile_picture: "avatar-7.jpg",
  },
  {
    _id: 10008,
    first_name: "jack",
    last_name: "gamage",
    institution: "University of Moratuwa",
    email: "jack@123.com",
    profile_picture: "avatar-8.jpg",
  },
];
