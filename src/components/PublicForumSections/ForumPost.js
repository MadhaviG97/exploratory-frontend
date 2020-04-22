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
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Divider from '@material-ui/core/Divider';

import image1 from "../../assets/images/user-profile/faces/marc.jpg";
import CommentSection from "./CommentSection";
import QuestionLike from "./QuestionLikeSection";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
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
}));

export default function Post() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root} align="justify">
      <CardHeader
        avatar={
          <Avatar alt="Remy Sharp" src={image1} />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Kamal Perera"
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography component="h1" color="textPrimary" align="left">
          Science And Technology
        </Typography>
        <Divider />
        <Typography component="h1" color="textPrimary" align="left">
          What is the meaning of word "Research"...?(Question)
        </Typography>
        <Divider />
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          align="justify"
        >
          Research has been defined in a number of different ways, and while
          there are similarities, there does not appear to be a single,
          all-encompassing definition that is embraced by all who engage in
          it..(Description)
        </Typography>
        <Divider />
      </CardContent>
      <CardActions disableSpacing>
        <QuestionLike />
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
          <CommentSection />
        </CardContent>
      </Collapse>
    </Card>
  );
}
