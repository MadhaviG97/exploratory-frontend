import React, { useEffect } from "react";
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
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import BorderColorOutlinedIcon from "@material-ui/icons/BorderColorOutlined";
import Alert from "../../../components/Project/AlertBox";
import FileUploader from "../../../components/Project/FileUploader";
import Avatar from "@material-ui/core/Avatar";
import Loader from "../../../components/Loader";

import CollaboratorForm from "../../../components/Forms/FormComponents/collaboratorForm";
import TagForm from "../../../components/Forms/FormComponents/TagForm";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
  render,
  getRelatedImages,
  getFinalPaper,
  getPublicFiles,
} from "../../../_actions/project_actions";
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
  const related_images = useSelector((state) => state.project).related_images;
  const final_paper = useSelector((state) => state.project).final_paper;
  const public_files = useSelector((state) => state.project).public_files;

  const dispatch = useDispatch();
  let { id } = useParams();
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || {
    from: { pathname: `/project/viewproject/${id}` },
  };

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
  });

  const handleCollaboratorUpdate = (new_list) => {
    setState({ ...state, collaborators: new_list });
  };

  const handleTagUpdate = (new_list) => {
    setState({ ...state, tags: new_list });
  };

  useEffect(() => {
    console.log(project);

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
            console.log();
            return response.data;
          })
          .catch((err) => console.log(err.message));

        var request_images = axios
          .post(
            "/drive/getfiles",
            {
              group: id,
              folder: "Related Images",
            },
            config
          )
          .then((response) => {
            return response.data;
          })
          .catch((err) => console.log(err.message));

        var request_final_paper = axios
          .post(
            "/drive/getfiles",
            {
              group: id,
              folder: "Final Paper",
            },
            config
          )
          .then((response) => {
            console.log(response.data);
            return response.data;
          })
          .catch((err) => console.log(err.message));

        var request_public_files = axios
          .post(
            "/drive/getfiles",
            {
              group: id,
              folder: "Public Files",
            },
            config
          )
          .then((response) => {
            console.log(response.data);
            return response.data;
          })
          .catch((err) => console.log(err.message));

        dispatch(getFinalPaper(request_final_paper))
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });

        dispatch(getPublicFiles(request_public_files))
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });

        dispatch(getRelatedImages(request_images))
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });

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
            // final_paper: final_paper,
            tags: tags,
            initialCollaborators: collaborators,
            spinner: false,
          });
        });
      }
    }
    return () => (mounted = false);
  }, []);

  // const AddressForm = () => {
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

  const handleAlertSubmit = async () => {
    setState({ ...state, spinner: true });
    const newCollaborators = getNewCollaborators(
      state.initialCollaborators,
      state.collaborators
    );

    const formData = {
      id: id,
      title: state.title,
      description: state.description,
      abstract: state.abstract,
      // creator: state.creator,
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
            console.log(result);
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
    setState({ ...state, alertOpen: true });
  };

  const handleEdit = (action) => {
    setState({ ...state, disabled: action });
  };

  const handleToggle = (visibility_public) => {
    setState({ ...state, visibility_public: visibility_public });
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
                      disabled={state.disabled}
                      value={state.description}
                      rows={4}
                      id="description"
                      name="description"
                      label="Project Description"
                      fullWidth
                      autoComplete="project description"
                      variant="outlined"
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      id="abstract"
                      name="abstract"
                      label="Abstract"
                      rows={4}
                      fullWidth
                      disabled={state.disabled}
                      value={state.abstract}
                      autoComplete="project abstract"
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
                      tags={tags.map((tag) => {
                        return {
                          tag_id: tag.tag_id,
                          title: tag.title,
                        };
                      })}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="button">Final Paper</Typography>
                    <Paper className={classes.fileUploader} elevation={3}>
                      <FileUploader
                        maxFiles={1}
                        multiple={false}
                        accept={"application/pdf"}
                        folder="Final Paper"
                        project_id={id}
                        // default={final_paper}
                      />
                    </Paper>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="button">Public Documents</Typography>
                    <Paper className={classes.fileUploader} elevation={3}>
                      <FileUploader
                        maxFiles={100}
                        multiple={true}
                        accept={"*"}
                        folder="Public Files"
                        project_id={id}
                        // default={public_files}
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    {/* //image uploader */}
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
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                    >
                      Submit Changes
                    </Button>
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
  // };

  // return (
  //   <React.Fragment>
  //     <Box display="flex" flexDirection="column">
  //       <Box>
  //         <Navbar />
  //       </Box>

  //       <Box flexGrow="1" bgcolor="#eceff1">
  //         <main className={classes.layout}>
  //           {project === undefined ? (
  //             <Loader />
  //           ) : (
  //             <Paper className={classes.paper} elevation={5}>
  //               <AddressForm />
  //             </Paper>
  //           )}
  //         </main>
  //       </Box>
  //       <Box>
  //         <Footer />
  //       </Box>
  //     </Box>
  //   </React.Fragment>
  // );
}

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "Psycho", year: 1960 },
  { title: "The Green Mile", year: 1999 },
  { title: "The Intouchables", year: 2011 },
  { title: "Modern Times", year: 1936 },
  { title: "Raiders of the Lost Ark", year: 1981 },
];
