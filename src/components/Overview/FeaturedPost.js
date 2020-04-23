import React from "react";

import { Grid, Card, CardContent, Box } from "@material-ui/core";
import { useStyles } from "../../assets/css/featuredPost";
import ProjectCard from "./projectCard";

export default function FeaturedPost(props) {
  const classes = useStyles();

  return (
    <Grid item className={classes.root}>
      <Card className={classes.card}>
        <div>
          <CardContent>
            <Box display="flex" flexDirection="column">
              <ProjectCard
                heading={props.card1.heading}
                value={props.card1.message}
                editState={props.card1.editState}
                name={props.card1.name}
                handleEditState={props.handleEditState}
              />
            </Box>
          </CardContent>
        </div>
      </Card>
    </Grid>
  );
}
