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
import ButtonLoader from "../../../components/Loader/ButtonLoader";

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
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    setLoggedInUser(user.userData);
  }, []);

  const AddressForm = () => {
    const [state, setState] = React.useState({
      id: "",
      title: "",
      description: "",
      currentuser: "",
      collaborators: [],
      tags: [],
      helperTextTitle: "",
      helperTextDescription: "",
      helperTextCollaborators: "",
      helperTextTags: "",
      errorTitle: false,
      errorDescription: false,
      errorCollaborators: false,
      errorTags: false,
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

    const validateForm = (formData) => {
      if (formData.title.length === 0) {
        setState({ ...state, helperTextTitle: "Required!", errorTitle: true });
        return false;
      } else if (formData.description.length === 0) {
        setState({
          ...state,
          helperTextDescription: "Required!",
          errorDescription: true,
        });
        return false;
      } else if (formData.collaborators.length === 0) {
        setState({
          ...state,
          helperTextCollaborators: "Required!",
          errorCollaborators: true,
        });
        return false;
      } else if (formData.tags.length === 0) {
        setState({
          ...state,
          helperTextTags: "Required!",
          errorTags: true,
        });
        return false;
      } else {
        return true;
      }
    };

    const handleSubmit = async (e) => {
      var collaborator_ids = state.collaborators.map((user) => user.id);
      var tag_ids = state.tags.map((tag) => tag.tag_id);
      const formData = {
        title: state.title,
        description: state.description,
        creator: state.currentuser._id,
        collaborators: [state.currentuser._id, ...collaborator_ids],
        tags: tag_ids,
      };
      var validated = validateForm(formData);

      if (validated) {
        setLoading(true);

        axios
          .post(`/project/create-project`, formData)
          .then(async (response) => {
            var id = response.data.insertId;

            await axios
              .post("/email/new-project", {
                id: id,
                receivers: state.collaborators,
              })
              .then((result) => {
                setLoading(false);
                setSuccess(true);
                let { from } = location.state || {
                  from: { pathname: `/project/viewproject/${id}` },
                };
                history.replace(from);
              })
              .catch((e) => console.log(e));
          })
          .catch((e) => console.log(e));
      }
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
            helperText={state.helperTextTitle}
            error={state.errorTitle}
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
            helperText={state.helperTextDescription}
            error={state.errorDescription}
            autoComplete="description"
            variant="outlined"
            onChange={handleChange}
            value={state.description}
          />
        </Grid>

        <Grid item xs={12}>
          <CollaboratorForm
            disabled={false}
            onChange={handleCollaboratorUpdate}
            errorCollaborators={state.errorCollaborators}
            helperTextCollaborators={state.helperTextCollaborators}
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
            helperTextTags={state.helperTextTags}
            errorTags={state.errorTags}
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
          <ButtonLoader
            name="create project"
            success={success}
            loading={loading}
            onClick={handleSubmit}
          />
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
