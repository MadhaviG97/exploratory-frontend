import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Suggestion from "./suggestion";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  chipContainer: {
    height: 100,
    padding: theme.spacing(3),
    justifyContent: "center",
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function InstitutionList(props) {
  const [state, setState] = React.useState({
    input: "",
    currentuser: props.currentuser,
    suggestions: [
      {
        id: "1",
        name: "madhavi gayathri",
        university: "university of moratuwa",
      },
      {
        id: "2",
        name: "amanda ariyaratne",
        university: "university of colombo",
      },
      {
        id: "3",
        name: "Damika Gamlath",
        university: "university of kelaniya",
      },
    ],
    show: false,
    checked: ["4"],
  });
  const classes = useStyles();

  const handleClick = (e) => {
    setState({
      ...state,
      show: !state.show,
    });
  };
  const handleChange = (e) => {
    setState({
      ...state,
      input: e.target.value,
    });
  };

  const handleClickAway = () => {
    setState({
      ...state,
      show: false,
    });
  };

  const handleDelete = (collaborator) => {
    const checkedIndex = state.checked.indexOf(collaborator.id);
    const checkedList = [...state.checked];
    checkedList.splice(checkedIndex, 1);

    setState({
      ...state,
      checked: checkedList,
    });
  };

  const handleToggle = (value) => {
    const currentIndex = state.checked.indexOf(value.id);
    const newChecked = [...state.checked];
    console.log(value);
    if (currentIndex === -1) {
      newChecked.push(value.id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setState({
      ...state,
      checked: newChecked,
    });
  };
  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12}>
          <ClickAwayListener onClickAway={handleClickAway}>
            <div style={{ position: "relative" }}>
              <TextField
                id="input-with-icon-textfield"
                variant="outlined"
                fullWidth
                value={state.input}
                label="Collaborators"
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        color="primary"
                        aria-label="add to shopping cart"
                        onClick={handleClick}
                      >
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {state.show && (
                <div style={{ position: "absolute", zIndex: 2 }}>
                  <Paper>
                    <Suggestion
                      suggestions={state.suggestions}
                      checked={state.checked}
                      onToggle={handleToggle}
                    />
                  </Paper>
                </div>
              )}
            </div>
          </ClickAwayListener>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.chipContainer} variant="outlined">
            <Grid>
              <Chip
                key={state.currentuser.id}
                className={classes.chip}
                avatar={
                  <Avatar
                    alt="Natacha"
                    src="images/profile-pictures/avatar.jpg"
                  />
                }
                label={state.currentuser.name}
              />
              {state.suggestions.map((collaborator) => {
                if (state.checked.includes(collaborator.id)) {
                  return (
                    <Chip
                      key={collaborator.id}
                      className={classes.chip}
                      avatar={
                        <Avatar
                          alt="Natacha"
                          src="images/profile-pictures/avatar.jpg"
                        />
                      }
                      label={collaborator.name}
                      onDelete={() => handleDelete(collaborator)}
                    />
                  );
                }
              })}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
