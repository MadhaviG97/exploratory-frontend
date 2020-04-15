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
  innerCard: {
    padding: theme.spacing(2),
    minHeight: 100,
    backgroundColor: "#f2e5f5",
  },
}));
