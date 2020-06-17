import React from "react";
import { useStyles } from "../../assets/css/team";
import { Paper, Grid, Box } from "@material-ui/core";
import Member from "./member";

export default function Team(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.abstract} elevation={3}>
      <Grid container xs={12} md={12} spacing={3}>
        {props.collaborators.map((member) => {
          return (
            <Grid item xs={12} lg={4} md={6} spacing={3}>
              <Member
                user_id={member.researcher_id}
                username={member.first_name
                  .concat(" ")
                  .concat(member.last_name)}
                university={member.institution_name}
                image={member.profile_picture}
                isAdmin={member.isAdmin}
              />
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
}
