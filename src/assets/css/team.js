import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: "400px",
    align: "center",
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  container: {
    width: "100%",
  },
  abstract: {
    padding: theme.spacing(5, 5),
    align: "center",
  },
  box: {
    padding: theme.spacing(3),
    align: "center",
  },
}));
