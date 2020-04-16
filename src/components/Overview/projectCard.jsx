import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box, Button, Divider } from "@material-ui/core";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  innerCard: {
    padding: theme.spacing(2),
    minHeight: 100,
    backgroundColor: "#eceff1",
  },
}));

export default function ProjectCard(props) {
  const [form, setForm] = React.useState({
    hypothesis: false,
    goal: false,
    experiment: false,
    result: false,
    finalpaper: false,
  });

  const handleClose = (type) => {
    setForm({
      ...form,
      [type]: false,
    });
  };

  const classes = useStyles();

  return (
    <Paper elevation={5}>
      <Box display="flex" flexDirection="coloumn" className={classes.innerCard}>
        <Box flexGrow="1">
          <Box>
            <Typography variant="button" color="textPrimary">
              {" "}
              <Box fontWeight="fontWeightBold">{props.heading}</Box>
            </Typography>
          </Box>
          <Box>
            <Divider />
          </Box>
          <Box flexGrow="1">
            <Typography variant="button">{props.value}</Typography>
          </Box>
        </Box>
        <Box display="flex" alignSelf="flex-end">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => props.handleEditState(props.name)}
          >
            <BorderColorIcon />
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

{
  /* <HypothesisForm
            onClick={form.hypothesis}
            handleClose={() => handleClose(props.heading)}
          />

          <GoalForm
            onClick={form.goal}
            handleClose={() => handleClose(props.heading)}
          /> */
}
