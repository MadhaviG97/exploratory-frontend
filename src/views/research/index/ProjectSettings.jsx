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
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import BorderColorOutlinedIcon from "@material-ui/icons/BorderColorOutlined";
import Alert from "./AlertBox";
import FileUploader from "./FileUploader";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createResearch } from "../../../_actions/project_actions";
//routing
import { useHistory, useLocation } from "react-router-dom";

export default function Form() {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const research = useSelector((state) => state.projectDetails);
  const dispatch = useDispatch();

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || {
    from: { pathname: "/project/viewproject/1" },
  };

  const AddressForm = () => {
    const [state, setState] = React.useState({
      title: "",
      description: "",
      abstract: "",
      author: {},
      collaborators: [],
      relatedImages: [],
      finalPaper: "",
      permission: false,
      tags: [],
      disabled: true,
      alertOpen: false,
    });

    const handleChange = (e) => {
      setState({
        ...state,
        [e.target.name]: e.target.state,
      });
      console.log(e.target);
    };

    const handleAlertClose = () => {
      setState({ ...state, alertOpen: false });
    };

    const handleAlertSubmit = () => {
      console.log("submit");
      const formData = {
        title: state.title,
        description: state.description,
        abstract: state.abstract,
        creator: state.creator,
        collaborators: state.collaborators,
        relatedImages: state.relatedImages,
        finalPaper: state.finalPaper,
        permission: state.permission,
        tags: state.tags,
      };
      dispatch(createResearch(formData)).then((result) => {
        console.log(result);
        history.replace(from);
      });
    };

    const handleSubmit = (e) => {
      setState({ ...state, alertOpen: true });
    };

    const handleEdit = (action) => {
      setState({ ...state, disabled: action });
    };

    return (
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
            defaultValue="Automated Inter-artefact Traceability Establishment for DevOps Practice"
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
            disabled={state.disabled}
            defaultValue="Showcase your professional experience and education to help potential employers and collaborators find and contact you about career opportunities."
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
            fullWidth
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
            options={top100Films}
            defaultValue={[top100Films[5]]}
            // onChange={(event, value) => {
            //   onCollaboratorChange(value);
            // }}
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
                label="Creator"
                name="Creator"
                variant="outlined"
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            multiple
            disabled={state.disabled}
            id="fixed-tags-demo"
            options={top100Films}
            defaultValue={[top100Films[1], top100Films[2], top100Films[3]]}
            name="collaborators"
            // onChange={(event, value) => {
            //   onTagsChange(value);
            // }}
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
                label="collaborators"
                name="collaborators"
                variant="outlined"
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            multiple
            disabled={state.disabled}
            id="fixed-tags-demo"
            options={top100Films}
            defaultValue={[top100Films[5], top100Films[3], top100Films[0]]}
            name="tags"
            // onChange={(event, value) => {
            //   onTagsChange(value);
            // }}
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

        <Grid item xs={12}>
          <Typography variant="button">Related Images</Typography>
          <Paper className={classes.fileUploader} elevation={3}>
            <FileUploader maxFiles={5} multiple={true} accept={"image/*"} />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="button">Final Paper</Typography>
          <Paper className={classes.fileUploader} elevation={3}>
            <FileUploader maxFiles={1} multiple={false} accept={""} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          {/* //image uploader */}
        </Grid>

        <Grid item xs={12} align="end">
          <Button variant="contained" color="primary" onClick={handleSubmit}>
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
