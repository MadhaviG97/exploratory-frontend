import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import Box from "@material-ui/core/Box";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "#eceff1",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1",
    width: 180,
  },
  cover: {
    width: 100,
    height: 100,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

export default function Team(props) {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <CardActionArea>
      <Card className={classes.root}>
        <CardMedia
          className={classes.cover}
          image={props.image}
          title="Live from space album cover"
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="subtitle1" color="textPrimary">
              {" "}
              <Box fontWeight="fontWeightBold">{props.username}</Box>
            </Typography>

            <Typography variant="caption" color="textSecondary">
              {" "}
              <Box fontWeight="fontWeightBold">{props.university}</Box>
            </Typography>
          </CardContent>
        </div>
      </Card>
    </CardActionArea>
  );
}
