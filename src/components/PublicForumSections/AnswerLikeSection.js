import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";

// import DeleteQuestion from "./QuestionDeleteDialog";
// import EditQuestion from "./EditQuestionDialog";
// import LikeQuestion from "./AddQLIke";

import AnswerLike from "./AddALike";
import AddComment from "./AddComment";
import DeleteAnswer from "./AnswerDeleteDialog";
import EditAnswer from "./EditAnswerDialog";

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
  const [available, setAvailable] = React.useState(false);
  const answerLikes = useSelector((state) => state.forum.answerLikes);

  var answer = {
    id: props.answer.answer_id,
    question_id: props.answer.question_id,
    researcher_id: user.userData._id,
  };

  function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
      if (
        list[i].question_id == answer.question_id &&
        list[i].researcher_id == answer.researcher_id &&
        list[i].answer_id == answer.id
      ) {
        setAvailable(true);
      }
    }
  }

  useEffect(() => {
    var contains = containsObject(answer, answerLikes);
  }, []);

  const handleBadgeVisibility = () => {
    setInvisible(!invisible);
  };

  return (
    <div className={classes.root}>
      {user.userData.isAuth ? (
        <div>
          {!available ? (
            <ButtonGroup
              color="primary"
              aria-label="outlined primary button group"
            >
              <AnswerLike
                answer_id={props.answer.answer_id}
                question_id={props.answer.question_id}
              />
              >
            </ButtonGroup>
          ) : (
            <div></div>
          )}
          {props.answer.researcher_id === user.userData._id ? (
            <ButtonGroup
              color="primary"
              aria-label="outlined primary button group"
            >
              <DeleteAnswer answer_id={props.answer.answer_id} />
              <EditAnswer
                answer={props.answer.answer}
                answer_id={props.answer.answer_id}
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
