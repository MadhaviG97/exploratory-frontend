import React from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
} from "@material-ui/core";
import { useStyles } from "../assets/css/featuredPost";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import Paper from "@material-ui/core/Paper";

export default function FeaturedPost(props) {
  const classes = useStyles();

  return (
    <Grid item className={classes.root}>
      <Card className={classes.card}>
        <div>
          <CardContent>
            <Box display="flex" flexDirection="column">
              <Box display="flex" flexDirection="row">
                <Box flexGrow="1">
                  <Typography variant="button" color="textPrimary">
                    {" "}
                    <Box fontWeight="fontWeightBold">{props.heading1}</Box>
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" flexDirection="row">
                <Box width={1 / 2} className={classes.subcard}>
                  <Paper elevation={3}>
                    <Box
                      display="flex"
                      flexDirection="coloumn"
                      className={classes.innerCard}
                    >
                      <Box flexGrow="1">
                        <Typography variant="button">
                          {props.heading2}
                        </Typography>
                      </Box>
                      <Box display="flex" alignSelf="flex-end">
                        <BorderColorIcon />
                      </Box>
                    </Box>
                  </Paper>
                </Box>
                <Box width={1 / 2} className={classes.subcard}>
                  <Paper elevation={3}>
                    <Box
                      display="flex"
                      flexDirection="coloumn"
                      className={classes.innerCard}
                    >
                      <Box flexGrow="1">
                        <Typography variant="button">
                          {props.heading3}
                        </Typography>
                      </Box>
                      <Box display="flex" justifyContent="center">
                        <BorderColorIcon />
                      </Box>
                    </Box>
                  </Paper>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </div>
      </Card>
    </Grid>
  );
}
