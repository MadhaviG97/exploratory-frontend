import React from "react";
import { Paper, Box } from "@material-ui/core";
import { useStyles } from "../../../assets/css/createResearch";
import Loader from "../../../components/Loader";
import CreateForm from "../../../components/Forms/CreateProject";
import { useSelector } from "react-redux";

export default function Form() {
  const classes = useStyles();
  let user = useSelector((state) => state.user);

  return (
    <React.Fragment>
      <Box display="flex" flexDirection="column">
        <Box flexGrow="1" bgcolor="#eceff1">
          {user.userData === undefined ? (
            <Loader />
          ) : (
            <div className={classes.root}>
              <main className={classes.layout}>
                <br />
                <br />
                <Paper className={classes.paper} elevation={10}>
                  <CreateForm />
                </Paper>
                <br />
                <br />
              </main>
            </div>
          )}
        </Box>
      </Box>
    </React.Fragment>
  );
}
