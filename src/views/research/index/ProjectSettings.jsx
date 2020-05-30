import React, { useEffect } from "react";
import { Grid, Typography, TextField, Paper, Box } from "@material-ui/core";
import Navbar from "../../../components/Navbar/Navbar";
import { useStyles } from "../../../assets/css/createResearch";
import Footer from "../../../components/Footer/Footer";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import BorderColorOutlinedIcon from "@material-ui/icons/BorderColorOutlined";
import Alert from "../../../components/Project/AlertBox";

import Avatar from "@material-ui/core/Avatar";
import Loader from "../../../components/Loader";

import CollaboratorForm from "../../../components/Forms/FormComponents/collaboratorForm";
import TagForm from "../../../components/Forms/FormComponents/TagForm";
import ButtonLoader from "../../../components/Loader/ButtonLoader";

//redux
import { useSelector, useDispatch } from "react-redux";
import { render } from "../../../_actions/project_actions";
//routing
import { useHistory, useLocation, useParams } from "react-router-dom";
//API call
import axios from "axios";
import ToggleButton from "../../../components/Forms/FormComponents/ToggleButton";

export default function Form() {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const project = useSelector((state) => state.project).project;
  const admins = useSelector((state) => state.project).admins;
  const collaborators = useSelector((state) => state.project).collaborators;
  const tags = useSelector((state) => state.project).tags;

  const dispatch = useDispatch();
  let { id } = useParams();
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || {
    from: { pathname: `/project/viewproject/${id}` },
  };

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const [state, setState] = React.useState({
    title: "",
    description: "",
    abstract: "",
    author: {},
    collaborators: [],
    visibility_public: 1,
    tags: [],
    disabled: true,
    alertOpen: false,
    initialCollaborators: [],
    spinner: true,
    helperTextTitle: "",
    helperTextDescription: "",
    helperTextTags: "",
    errorTitle: false,
    errorDescription: false,
    errorTags: false,
  });

  const handleCollaboratorUpdate = (new_list) => {
    setState({ ...state, collaborators: new_list });
  };

  const handleTagUpdate = (new_list) => {
    setState({ ...state, tags: new_list });
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (project === undefined) {
        let config = {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        };

        var request = axios
          .post("/project/view-project", { id: id })
          .then((response) => {
            return response.data;
          })
          .catch((err) => console.log(err.message));

        dispatch(render(request)).then((response) => {
          var project = response.payload.project_details.project;
          var collaborators = response.payload.project_details.collaborators;
          var tags = response.payload.project_details.tags;
          setState({
            ...state,
            title: project.title,
            description: project.description,
            abstract: project.abstract,
            author: project.creator,
            collaborators: collaborators,
            visibility_public: project.visibility_public,
            tags: tags,
            initialCollaborators: collaborators,
            spinner: false,
          });
        });
      }
    }
    return () => (mounted = false);
  }, []);

  const handleChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    console.log(e.target);
  };

  const handleAlertClose = () => {
    setState({ ...state, alertOpen: false });
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

  const handleAlertSubmit = async () => {
    setState({ ...state, alertOpen: false });
    setLoading(true);
    const newCollaborators = getNewCollaborators(
      state.initialCollaborators,
      state.collaborators
    );

    const formData = {
      id: id,
      title: state.title,
      description: state.description,
      abstract: state.abstract,
      collaborators: state.collaborators,
      visibility_public: state.visibility_public,
      tags: state.tags,
    };
    axios
      .post(`/project/update-project`, formData)
      .then((response) => {
        console.log(response);
        axios
          .post("/email/new-project", {
            id: id,
            receivers: newCollaborators,
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
  };

  const getNewCollaborators = (oldList, newList) => {
    var newCollaborators = [];
    var user;
    var old;
    for (user of newList) {
      let exist = false;
      for (old of oldList) {
        if (old.researcher_id === user.id) {
          exist = true;
          break;
        }
      }
      if (!exist) {
        newCollaborators.push(user);
      }
    }
    return newCollaborators;
  };

  const handleSubmit = (e) => {
    const formData = {
      title: state.title,
      description: state.description,
      tags: state.tags,
    };

    var validated = validateForm(formData);
    if (validated) {
      setState({ ...state, alertOpen: true });
    }
  };

  const handleEdit = (action) => {
    setState({ ...state, disabled: action });
  };

  const handleToggle = (visibility_public) => {
    setState({ ...state, visibility_public: visibility_public });
  };

  return (
    <React.Fragment>
      <Box display="flex" flexDirection="column">
        <Box>
          <Navbar />
        </Box>

        <Box flexGrow="1" bgcolor="#eceff1">
          <main className={classes.layout}>
            {state.spinner ? (
              <Loader />
            ) : (
              <Paper className={classes.paper} elevation={5}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h6" align="center">
                      PROJECT SETTINGS
                      <IconButton
                        aria-label="edit"
                        color="primary"
                        onClick={(e) => handleEdit(false)}
                      >
                        <BorderColorOutlinedIcon />
                      </IconButton>
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      disabled={state.disabled}
                      error={state.errorTitle}
                      helperText={state.helperTextTitle}
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
                      error={state.errorDescription}
                      helperText={state.helperTextDescription}
                      disabled={state.disabled}
                      value={state.description}
                      rows={4}
                      id="description"
                      name="description"
                      label="Project Description"
                      fullWidth
                      autoComplete="description"
                      variant="outlined"
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      id="abstract"
                      name="abstract"
                      label="Abstract"
                      rows={4}
                      fullWidth
                      disabled={state.disabled}
                      value={state.abstract}
                      autoComplete="description"
                      variant="outlined"
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Autocomplete
                      multiple
                      id="fixed-tags-demo"
                      disabled
                      options={admins}
                      defaultValue={admins}
                      getOptionLabel={(option) =>
                        option.first_name.concat(" ").concat(option.last_name)
                      }
                      renderInput={(state, getTagProps) =>
                        state.map((option, index) => (
                          <Chip
                            label={option.first_name}
                            {...getTagProps({ index })}
                            disabled={index === 0}
                            avatar={
                              <Avatar
                                alt="propic"
                                src={option.profile_picture}
                              />
                            }
                          />
                        ))
                      }
                      style={{ width: 500 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Admins"
                          name="Admins"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CollaboratorForm
                      disabled={state.disabled}
                      onChange={handleCollaboratorUpdate}
                      collaborators={collaborators.map((user) => {
                        return {
                          first_name: user.first_name,
                          last_name: user.last_name,
                          id: user.researcher_id,
                          institution: user.institution_name,
                          profile_picture: user.profile_picture,
                          isAdmin: user.isAdmin,
                          email: user.researcher_email,
                        };
                      })}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TagForm
                      disabled={state.disabled}
                      onChange={handleTagUpdate}
                      errorTags={state.errorTags}
                      helperTextTags={state.helperTextTags}
                      tags={tags.map((tag) => {
                        return {
                          tag_id: tag.tag_id,
                          title: tag.title,
                        };
                      })}
                    />
                  </Grid>

                  <Grid item xs={12} container>
                    <Grid item xs={6}>
                      <Typography variant="button">
                        Public Visibility
                      </Typography>
                    </Grid>
                    <Grid item align="end" xs={6}>
                      <ToggleButton
                        visibility={state.visibility_public}
                        onChange={handleToggle}
                        disabled={state.disabled}
                      />
                    </Grid>
                  </Grid>

                  <Grid item xs={12} align="end">
                    <ButtonLoader
                      name="Save Project"
                      success={success}
                      loading={loading}
                      onClick={handleSubmit}
                    />
                  </Grid>
                  {state.alertOpen && (
                    <Alert
                      open={state.alertOpen}
                      onClose={handleAlertClose}
                      onSubmit={handleAlertSubmit}
                    />
                  )}
                </Grid>
              </Paper>
            )}
          </main>
        </Box>
        <Box>
          <Footer />
        </Box>
      </Box>
    </React.Fragment>
  );
}
