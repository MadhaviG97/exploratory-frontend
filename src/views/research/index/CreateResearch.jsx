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

export default function Form() {
  const classes = useStyles();

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

function AddressForm() {
  const [value, setValue] = React.useState({
    title: "",
    goal: "",
    currentuser: {
      id: "4",
      name: "madhavi gayathri",
      university: "university of moratuwa",
    },
  });

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("value");
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
      {console.log(value.currentuser)}
      <Grid item xs={12}>
        <CollaboratorList
          currentuser={value.currentuser}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} align="end">
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Create Project
        </Button>
      </Grid>
    </Grid>
  );
}
