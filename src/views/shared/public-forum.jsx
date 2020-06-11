import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import InfiniteScroll from "react-infinite-scroll-component";
// nodejs library that concatenates classes

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
// @material-ui/icons

// core components
import ForumPost from "../../components/PublicForumSections/ForumPost";
import ForumAppBar from "../../components/PublicForumSections/ForumAppBar";
import CountGrid from "../../components/PublicForumSections/CountGrid";
import AddQuestionDialog from "../../components/PublicForumSections/AddQuestionDialog";
import PopularSectionTab from "../../components/PublicForumSections/PopularSectionTab";
import UserSection from "../../components/PublicForumSections/UserSection";

import {
  getQuestions,
  getAnswers,
  getForumUsers,
  getFreqUsers,
  getPopularQuestions,
  getPopularAnswers,
  getQuestionLikes,
  getAnswerLikes,
} from "../../_actions/forum_actions";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minWidth: 250,
    minHeight: 550,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  paperQuestion: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    minHeight: 550,
  },
  loader: {
    height: 550,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
}));

export default function Forum() {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const forum = useSelector((state) => state.forum);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    dispatch(getAnswers());
    dispatch(getQuestions());
    dispatch(getForumUsers());
    dispatch(getFreqUsers());
    dispatch(getPopularQuestions());
    dispatch(getPopularAnswers());
    dispatch(getQuestionLikes());
    dispatch(getAnswerLikes());
  }, []);

  const questions = useSelector((state) => state.questions);

  return (
    <div>
      <ForumAppBar userDetails={user.userData} />
      {loading ? (
        <div className={classes.loader}>
          <ReactLoading
            type="spinningBubbles"
            color="#5054CC"
            height={550}
            width={50}
          />
        </div>
      ) : (
        <div className={classes.root}>
          <Grid container>
            <Grid item xs>
              <InfiniteScroll
                dataLength={1000} //This is important field to render the next data
                height={800}
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>********</b>
                  </p>
                }
              >
                <Paper>
                  <UserSection />
                </Paper>
              </InfiniteScroll>
            </Grid>

            <Divider orientation="vertical" variant="fullWidth" />

            <Grid item xs={6}>
              <InfiniteScroll
                dataLength={1000} //This is important field to render the next data
                height={800}
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>You have seen it all</b>
                  </p>
                }
              >
                <Container style={{ backgroundColor: "white", padding: "5px" }}>
                  {Object.keys(questions).length > 0 ? (
                    questions.questions.map((question) => (
                      <ForumPost postDetails={question} valid={1} />
                    ))
                  ) : (
                    <Paper className={classes.paperQuestion}>
                      <Typography variant="h6" gutterBottom color="primary">
                        No questions yet...
                      </Typography>
                    </Paper>
                  )}

                  <Divider />
                </Container>
              </InfiniteScroll>
            </Grid>

            <Divider orientation="vertical" variant="fullWidth" />

            <Grid item xs>
              <Paper className={classes.paper}>
                <AddQuestionDialog />
              </Paper>
              <Divider />
              <Paper>
                <CountGrid />
              </Paper>
              <Divider />
              <InfiniteScroll
                dataLength={1000} //This is important field to render the next data
                height={600}
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>********</b>
                  </p>
                }
              >
                <Paper>
                  <PopularSectionTab />
                </Paper>
              </InfiniteScroll>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}
