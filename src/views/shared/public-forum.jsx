import React, { Fragment } from "react";

// nodejs library that concatenates classes

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
// @material-ui/icons

// core components
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import ForumPost from "../../components/PublicForumSections/ForumPost";
import ForumAppBar from "../../components/PublicForumSections/ForumAppBar";
import CountGrid from "../../components/PublicForumSections/CountGrid";
import AddQuestionDialog from "../../components/PublicForumSections/AddQuestionDialog";
import PopularSectionTab from "../../components/PublicForumSections/PopularSectionTab";
import UserSection from "../../components/PublicForumSections/UserSection";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function AutoGrid() {
  const classes = useStyles();

  return (
    <div>
      <Navbar />
      <ForumAppBar />
      <div className={classes.root} >
        <Grid container>
          <Grid item xs>
            <Paper >
              <UserSection />
            </Paper>
          </Grid>

          <Divider orientation="vertical" variant="fullWidth" />

          <Grid item xs={6}>
            <ForumPost />
            <Divider />
            <ForumPost />
            <Divider />
            <ForumPost />
            <Divider />
            <ForumPost />
            <Divider />
            <ForumPost />
          </Grid>

          <Divider orientation="vertical" variant="fullWidth" />

          <Grid item xs>
            <Paper className={classes.paper}>
              <AddQuestionDialog />
            </Paper>
            <Divider />
            <Paper >
              <CountGrid />
            </Paper>
            <Divider />
            <Paper >
              <PopularSectionTab />
            </Paper>            
          </Grid>
        </Grid>
      </div>
      <Footer />
    </div>
  );
}
