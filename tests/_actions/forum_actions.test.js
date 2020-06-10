import * as actions from "../../src/_actions/forum_actions";
import * as types from "../../src/_actions/types";

describe('Forum axios actions', () => {
  beforeAll(done => {
    done()
  })
  
  it('Should fetch forum question likes', async (done) => {
    const data = await actions.getQuestionLikes();
    expect(data.type).toEqual(types.GET_QUESTION_LIKES);
    done();
  });

  it('Should fetch forum answer likes', async (done) => {
    const data = await actions.getAnswerLikes();
    expect(data.type).toEqual(types.GET_ANSWER_LIKES);
    done();
  });
})


