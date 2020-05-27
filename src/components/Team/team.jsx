import React from "react";
import { useStyles } from "../../assets/css/team";
import { Paper, Grid, Box } from "@material-ui/core";
import Member from "./member";

export default function Team(props) {
  const classes = useStyles();

  return (
    <Box className={classes.container} display="flex" flexDirection="column">
      <Box className={classes.box}>
        <Paper className={classes.abstract} elevation={3}>
          <Grid container xs={12} md={12} spacing={3}>
            {props.collaborators.map((member) => {
              return (
                <Grid item xs={4}>
                  <Member
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
      </Box>
    </Box>
  );
}
