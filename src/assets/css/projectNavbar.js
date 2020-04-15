import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  paperroot: {
    padding: theme.spacing(2, 23),
    backgroundColor: "#ffffff",
  },
  root: {
    padding: theme.spacing(2, 5),
  },
  left: {
    padding: theme.spacing(0, 5, 0),
  },
  tab: {
    backgroundColor: "#cfe8fc",
    height: "100vh",
  },
  container: {
    display: "flex",
    flexDirection: "coloumn",
    justifyContent: "center",
    padding: theme.spacing(5),
  },
  paper: {
    backgroundColor: "#cfe8fc",
    height: "100vh",
    position: "relative",
    flexGrow: 1,
  },
  listItem: {
    padding: theme.spacing(1, 1),
  },
  heading: {
    padding: theme.spacing(0),
  },
}));
