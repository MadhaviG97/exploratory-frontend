import {
  getQuestions,
  addQuestion,
  getAnswers,
  addAnswer,
  deleteQuestion,
  deleteAnswer,
  editQuestion,
  editAnswer,
  getForumUsers,
  getFreqUsers,
  getPopularQuestions,
  getPopularAnswers,
  likeQuestion,
  likeAnswer,
  forumSearch,
  getQuestionLikes,
  getAnswerLikes,
} from "../../src/_actions/forum_actions";
import * as actions from "../../src/_actions/forum_actions";
import * as types from "../../src/_actions/types";

describe("Forum question actions", () => {
    test("1. get questions", (done) => {
        var response = actions.getQuestions();
        expect(response.type).toEqual(types.GET_QUESTIONS);
      });
});
