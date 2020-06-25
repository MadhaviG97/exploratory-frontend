import React from "react";
import { useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import Box from "@material-ui/core/Box";
import { useHistory } from "react-router-dom";
import { useStyles } from "../../assets/css/member";

export default function TeamMember(props) {
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();

  return (
    <CardActionArea
      id={props.user_id}
      onClick={() => {
        history.push(`/userprofile/${props.user_id}`);
      }}
    >
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
              <Box fontWeight="fontWeightBold" alignItems="center">
                {props.username}
              </Box>
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
