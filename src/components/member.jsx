import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
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
              {props.username}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {props.university}
            </Typography>
          </CardContent>
        </div>
      </Card>
    </CardActionArea>
  );
}
