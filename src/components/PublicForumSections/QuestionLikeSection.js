import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import DeleteQuestion from "./QuestionDeleteDialog";
import EditQuestion from "./EditQuestionDialog";
import LikeQuestion from "./AddQLIke";

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
  const user = useSelector((state) => state.user);
  const is_logged = useSelector((state) => state.is_logged);
  const [invisible, setInvisible] = React.useState(false);


  const handleBadgeVisibility = () => {
    setInvisible(!invisible);
  };

  return (
    <div className={classes.root}>
      {user.userData.isAuth ? (
        <div>
          <ButtonGroup
            color="primary"
            aria-label="outlined primary button group"
          >
            <LikeQuestion
              question_id={props.question_id}
              researcher_id={user.userData._id}
            />>
          </ButtonGroup>
          {user.userData._id === props.Q_id ? (
            <ButtonGroup
              color="primary"
              aria-label="outlined primary button group"
            >
              <DeleteQuestion question_id={props.question_id} />
              <EditQuestion
                question_id={props.question_id}
                title={props.title}
                description={props.description}
              />
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
