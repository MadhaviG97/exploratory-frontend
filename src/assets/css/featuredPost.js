import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0),
    width: "100",
  },
  card: {
    padding: theme.spacing(0),
  },
  subcard: {
    color: "#f3e5f5",
    padding: theme.spacing(2),
  },
  overview: {
    padding: theme.spacing(2, 0),
  },
}));
