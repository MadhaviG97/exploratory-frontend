import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import EditIcon from "@material-ui/icons/Edit";

import DeleteQuestion from "./QuestionDeleteDialog"
import { useDispatch, useSelector } from "react-redux";

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
  buttonPlace: {
    flexDirection: "row-reverse",
  },
}));

export default function QuestionLike(props) {
  const classes = useStyles();
  const [count, setCount] = React.useState(1);
  const [invisible, setInvisible] = React.useState(false);
  const user = useSelector((state) => state.user);
  const is_logged = useSelector((state) => state.is_logged);
  const questions = useSelector((state) => state.questions);

  const handleBadgeVisibility = () => {
    setInvisible(!invisible);
  };

  return (
    <div className={classes.root}>
      {user.userData.isAuth ? (
        <div>
          <Button
            aria-label="increase"
            onClick={() => {
              setCount(count + 1);
            }}
          >
            <Badge color="primary" badgeContent={count}>
              <ThumbUpIcon fontSize="small" />
            </Badge>
          </Button>
          {user.userData._id === props.Q_id ? (
            <ButtonGroup
              color="primary"
              aria-label="outlined primary button group"
            >
              <DeleteQuestion question_id={props.question_id} />
              <IconButton aria-label="edit">
                <EditIcon />
              </IconButton>
            </ButtonGroup>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
