import React from "react";
import { Box } from "@material-ui/core";
import { useStyles } from "../../assets/css/overview";
import FeaturedPost from "./FeaturedPost";
import HypothesisForm from "../Forms/ProjectForms/HypothesisForm";
import GoalForm from "../Forms/ProjectForms/GoalForm";

export default function Overview() {
  const classes = useStyles();

  const [form, setForm] = React.useState({
    goal: {
      name: "goal",
      heading: "Goal",
      message: "This is my goal",
      editState: false,
    },
    hypothesis: {
      name: "hypothesis",
      heading: "Hypothesis",
      message: "This is my hypothesis",
      editState: false,
    },
    finalpaper: {
      name: "finalpaper",
      heading: "Final Paper",
      message: "This is my final paper",
      editState: false,
    },
    experimentalfindings: {
      name: "experimentalfindings",
      heading: "Experimental Findings",
      message: "This is my experimental findings",
      editState: false,
    },
    extradocuments: {
      name: "extradocuments",
      heading: "Extra Documents",
      message: "This is my extradocuments",
      editState: false,
    },
    results: {
      name: "results",
      heading: "Results",
      message: "This is my results",
      editState: false,
    },
  });

  const setEditState = (card) => {
    const editState = form[card].editState;
    setForm({
      ...form,
      [card]: {
        ...form[card],
        editState: !editState,
      },
    });
  };

  return (
    <React.Fragment>
      <Box>
        <Box className={classes.overview}>
          <FeaturedPost
            card1={form.goal}
            card2={form.hypothesis}
            handleEditState={setEditState}
          />
        </Box>
        <Box className={classes.overview}>
          <FeaturedPost
            card1={form.finalpaper}
            card2={form.extradocuments}
            handleEditState={setEditState}
          />
        </Box>
        <Box className={classes.overview}>
          <FeaturedPost
            card1={form.experimentalfindings}
            card2={form.results}
            handleEditState={setEditState}
          />
        </Box>
      </Box>
      <HypothesisForm
        open={form.hypothesis.editState}
        defaultValue={form.hypothesis.message}
        handleClose={setEditState}
      />
      <GoalForm
        open={form.goal.editState}
        defaultValue={form.goal.message}
        handleClose={setEditState}
      />
    </React.Fragment>
  );
}
