import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
// nodejs library that concatenates classes

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
// @material-ui/icons

// core components
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import ForumPost from "../../components/PublicForumSections/ForumPost";
import SearchAppBar from "../../components/PublicForumSections/SearchAppBar";
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
import { Typography } from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minWidth: 250,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  paperHeading: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
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
  let { string } = useParams();
  const [searchResult, setSearchResult] = React.useState({});
  console.log(string);

  React.useEffect(() => {
    var request = axios
      .post("/forum/search/questions", { searchString: string })
      .then((response) => {
        setSearchResult(response.data.data);
        // return response.data;
      });
  }, [string]);

  console.log(searchResult);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    dispatch(getAnswers());
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
      <SearchAppBar userDetails={user.userData} />
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
              <Paper>
                <UserSection />
              </Paper>
            </Grid>

            <Divider orientation="vertical" variant="fullWidth" />

            <Grid item xs={6}>
              <Paper className={classes.paperHeading}>
                <Typography variant="h6" gutterBottom color="primary">
                  Search Results for "{string}"
                </Typography>
              </Paper>

              <Container style={{ backgroundColor: "white", padding: "5px" }}>
                {Object.keys(searchResult).length > 0 ? (
                  searchResult.map((question) => (
                    <ForumPost postDetails={question} valid={0} />
                  ))
                ) : (
                  <Paper className={classes.paper}>
                    <Typography variant="h6" gutterBottom color="primary">
                      No results for your search...
                    </Typography>
                  </Paper>
                )}

                <Divider />
              </Container>
            </Grid>

            <Divider orientation="vertical" variant="fullWidth" />

            <Grid item xs>
              <Paper>
                <PopularSectionTab />
              </Paper>
            </Grid>
          </Grid>
        </div>
      )}
      <Footer />
    </div>
  );
}
