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
import { useStyles } from "../../../assets/css/createResearch";
import Footer from "../../../components/Footer/Footer";
import CollaboratorForm from "../../../components/Forms/FormComponents/collaboratorForm";
import TagForm from "../../../components/Forms/FormComponents/TagForm";
import Loader from "../../../components/Loader";

//redux
import { useSelector } from "react-redux";
//routing
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";

export default function Form() {
  const classes = useStyles();
  let user = useSelector((state) => state.user);
  let history = useHistory();
  let location = useLocation();
  const [loggedInUser, setLoggedInUser] = React.useState({});
  React.useEffect(() => {
    setLoggedInUser(user.userData);
  }, []);

  const AddressForm = () => {
    const [state, setState] = React.useState({
      title: "",
      description: "",
      currentuser: "",
      collaborators: [],
      tags: [],
    });

    React.useEffect(() => {
      setState({ ...state, currentuser: user.userData });
    }, []);

    const handleCollaboratorUpdate = (new_list) => {
      setState({ ...state, collaborators: new_list });
    };

    const handleTagUpdate = (new_list) => {
      setState({ ...state, tags: new_list });
    };

    const handleChange = (e) => {
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = async (e) => {
      var collaborator_ids = await state.collaborators.map((user) => user.id);
      var tag_ids = await state.tags.map((tag) => tag.tag_id);
      const formData = {
        title: state.title,
        description: state.description,
        creator: state.currentuser._id,
        collaborators: [state.currentuser._id, ...collaborator_ids],
        tags: tag_ids,
      };

      console.log(formData);

      axios
        .post(`/project/create-project`, formData)
        .then(async (response) => {
          var id = response.data.insertId;
          createFolder(id, "Final Paper");
          createFolder(id, "Related Images");
          createFolder(id, "Public Files");

          await axios
            .post("/email/new-project", {
              id: id,
              receivers: state.collaborators,
            })
            .then((result) => {
              let { from } = location.state || {
                from: { pathname: `/project/viewproject/${id}` },
              };
              history.replace(from);
            })
            .catch((e) => console.log(e));
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
            value={state.title}
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
            value={state.description}
          />
        </Grid>

        <Grid item xs={12}>
          <CollaboratorForm
            disabled={false}
            onChange={handleCollaboratorUpdate}
            collaborators={[].map((user) => {
              return {
                first_name: user.first_name,
                last_name: user.last_name,
                id: user.researcher_id,
                institution: user.institution_name,
                profile_picture: user.profile_picture,
                isAdmin: 1,
                email: user.email,
              };
            })}
          />
        </Grid>

        <Grid item xs={12}>
          <TagForm
            disabled={false}
            onChange={handleTagUpdate}
            tags={[].map((tag) => {
              return {
                tag_id: tag.tag_id,
                title: tag.title,
              };
            })}
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
          {user.userData === undefined ? (
            <Loader />
          ) : (
            <main className={classes.layout}>
              <Paper className={classes.paper} elevation={5}>
                <AddressForm />
              </Paper>
            </main>
          )}
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
