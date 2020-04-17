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
              <Box display="flex" flexDirection="row">
                <Box width={1 / 2} className={classes.subcard}>
                  <ProjectCard
                    heading={props.card1.heading}
                    value={props.card1.message}
                    editState={props.card1.editState}
                    name={props.card1.name}
                    handleEditState={props.handleEditState}
                  />
                </Box>

                <Box width={1 / 2} className={classes.subcard}>
                  <ProjectCard
                    heading={props.card2.heading}
                    value={props.card2.message}
                    editState={props.card2.editState}
                    name={props.card2.name}
                    handleEditState={props.handleEditState}
                  />
                </Box>
              </Box>
            </Box>
          </CardContent>
        </div>
      </Card>
    </Grid>
  );
}
