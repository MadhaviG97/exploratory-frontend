import React from "react";
import { Container, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "../../components/Tab";

export default function home() {
  const classes = makeStyles((theme) => ({
    header: {
      backgroundColor: "red",
    },
    main: {
      backgroundColor: "green",
    },
    footer: {
      backgroundColor: "blue",
    },
  }));

  const tab = {
    backgroundColor: "#cfe8fc",
    height: "100vh",
  };

  const container = {
    display: "flex",
    flexDirection: "coloumn",
    justifyContent: "center",
  };

  return (
    <React.Fragment>
      <Container maxWidth="100%">
        <Typography component="div" style={tab}>
          <Grid container style={container}>
            <Grid item xs={12}>
              <Tab />
            </Grid>
          </Grid>
        </Typography>
      </Container>
    </React.Fragment>
  );
}
