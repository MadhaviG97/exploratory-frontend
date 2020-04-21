import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
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
