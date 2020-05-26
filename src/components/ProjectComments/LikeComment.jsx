import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      marginBottom: theme.spacing(0),
    },
    "& .MuiBadge-root": {
      marginRight: theme.spacing(0),
    },
  },
}));

export default function LikeComment(props) {
  const classes = useStyles();
  const [count, setCount] = React.useState(props.count);
  const [liked, setLiked] = React.useState(false);

  const handleClick = () => {
    var _count = liked ? count - 1 : count + 1;
    axios
      .post("/project/comments/like-comment", {
        reply_id: props.reply_id,
        count: _count,
      })
      .then((result) => {
        setCount(_count);
        setLiked(!liked);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className={classes.root}>
      <div>
        <Button size="small" aria-label="increase" onClick={handleClick}>
          <Badge color="primary" badgeContent={count} fontSize="small">
            <ThumbUpIcon fontSize="small" />
          </Badge>
        </Button>
      </div>
    </div>
  );
}
