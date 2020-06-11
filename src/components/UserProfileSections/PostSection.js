import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LinkTo from "@material-ui/core/Link";
import { useHistory, useLocation } from "react-router-dom";

import image1 from "../../assets/images/user-profile/bg2.jpg";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "auto",
    paddingBottom: 10,
  },
  media: {
    height: 300,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
  },
}));

export default function PostCard() {
  const classes = useStyles();
  const researcher = useSelector((state) => state.researcher);

  function getLength(obj) {
    var length = 0;
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
        length++;
      }
    }
    return length;
  }

  return (
    <div className={classes.root}>
      {getLength(researcher.posts) > 0 ? (
        researcher.posts.map((post) => (
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={post.poster_image}
                title={post.title}
              />
              <CardContent>
              <Typography variant="body2" color="textSecondary" component="p" align="left" >
                  {post.published_at}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {post.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
            <Link to={`/project/viewproject/${post.id}`} style={{ color: "primary" }}>
              <LinkTo component="button">View more...</LinkTo>
            </Link>
            </CardActions>
          </Card>
        ))
      ) : (
        <div align="left">
          <Typography
            variant="h6"
            align="center"
            color="primary"
            className={classes.paper}
          >
            No posts yet...
          </Typography>
        </div>
      )}
    </div>
  );
}
