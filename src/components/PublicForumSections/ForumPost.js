import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Badge from "@material-ui/core/Badge";
import StarsIcon from "@material-ui/icons/Stars";

import CommentSection from "./CommentSection";
import QuestionLike from "./QuestionLikeSection";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "auto",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  star: {
    paddingLeft: 10,
    paddingRight: 15
  },
}));

export default function Post(props) {
  const classes = useStyles();
  const is_logged = useSelector((state) => state.is_logged);
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  var theDate = new Date(props.postDetails.Q_created_at);
  const dateString = theDate.toDateString();

  return (
    <Container
      maxWidth="auto"
      style={{ backgroundColor: "#8EA2F0", padding: "2px 2px 5px 2px" }}
    >
      <Card className={classes.root} align="justify">
        <CardHeader
          avatar={
            <Avatar
              alt={
                props.postDetails.first_name + " " + props.postDetails.last_name
              }
              src={props.postDetails.profile_picture}
            />
          }
          title={
            props.postDetails.first_name + " " + props.postDetails.last_name
          }
          subheader={dateString}
        />
        <CardContent>
          <Typography component="h1" color="textPrimary" align="left">
            {props.postDetails.category_name}
          </Typography>
          <Divider />
          <Typography component="h1" color="textPrimary" align="left">
            {props.postDetails.title}
          </Typography>
          <Divider />
          <Typography
            variant="body2"
            color="textSecondary"
            component="h6"
            align="justify"
          >
            {props.postDetails.description}
          </Typography>
          <Divider />
        </CardContent>
        <CardActions disableSpacing>
          {props.postDetails.like_count > 0 ? (
            <div className={classes.star}>
              <Badge
                color="primary"
                badgeContent={props.postDetails.like_count}
              >
                <StarsIcon fontSize="medium" color="primary" />
              </Badge>
            </div>
          ) : (
            <div className={classes.star}>
              <StarsIcon fontSize="medium" color="primary" />
            </div>
          )}

          {is_logged && props.valid==1 ? (
            <QuestionLike
              Q_id={props.postDetails.researcher_id}
              question_id={props.postDetails.question_id}
              title={props.postDetails.title}
              description={props.postDetails.description}
              like_count={props.postDetails.like_count}
            />
          ) : (
            <div></div>
          )}

          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <CommentSection
              question_id={props.postDetails.question_id}
              question_title={props.postDetails.title}
            />
          </CardContent>
        </Collapse>
      </Card>
    </Container>
  );
}
