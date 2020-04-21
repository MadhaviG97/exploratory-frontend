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
import CollaboratorList from "../../../components/Forms/FormComponents/collaboratorList";
import { useStyles } from "../../../assets/css/createResearch";
import Footer from "../../../components/Footer/Footer";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
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
      goal: "",
      currentuser: {
        id: "4",
        name: "madhavi gayathri",
        university: "university of moratuwa",
      },
      collaborators: [],
      tags: [],
    });

    const handleChange = (e) => {
      setState({
        ...state,
        [e.target.name]: e.target.state,
      });
      console.log(e.target.value);
    };

    const onTagsChange = (values) => {
      setState({
        ...state,
        tags: values,
      });
      console.log(values);
    };

    const onCollaboratorChange = (values) => {
      setState({
        ...state,
        collaborators: values,
      });
      console.log(values);
    };

    const handleSubmit = (e, cb) => {
      const formData = {
        title: state.title,
        goal: state.goal,
        creator: state.currentuser,
        collaborators: state.collaborators,
        tags: state.tags,
      };
      console.log(formData);
      dispatch(createResearch(formData)).then((result) => {
        console.log(result);
        cb();
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
            id="goal"
            name="goal"
            label="Goal"
            fullWidth
            autoComplete="project goal"
            variant="outlined"
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            multiple
            id="fixed-tags-demo"
            options={top100Films}
            onChange={(event, value) => {
              onCollaboratorChange(value);
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
            options={top100Films}
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
          <Button
            variant="contained"
            color="primary"
            onClick={(e) =>
              handleSubmit(e, () => {
                history.replace(from);
              })
            }
          >
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
