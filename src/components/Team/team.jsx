import React from "react";
import { useStyles } from "../../assets/css/team";
import { Paper, Grid } from "@material-ui/core";
import Member from "./member";

export default function Team(props) {
  const classes = useStyles();
  function FormRow() {
    return <React.Fragment></React.Fragment>;
  }

  const details = {
    username: "madhavi gayathri",
    university: "University of Moratuwa",
    image: "images/profile-pictures/example.jpg",
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={4}>
            <Member
              username={details.username}
              university={details.university}
              image={details.image}
            />
          </Grid>
          <Grid item xs={4}>
            <Member
              username={details.username}
              university={details.university}
              image={details.image}
            />
          </Grid>
          <Grid item xs={4}>
            <Member
              username={details.username}
              university={details.university}
              image={details.image}
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={4}>
            <Member
              username={details.username}
              university={details.university}
              image={details.image}
            />
          </Grid>
          <Grid item xs={4}>
            <Member
              username={details.username}
              university={details.university}
              image={details.image}
            />
          </Grid>
          <Grid item xs={4}>
            <Member
              username={details.username}
              university={details.university}
              image={details.image}
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={4}>
            <Member
              username={details.username}
              university={details.university}
              image={details.image}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
