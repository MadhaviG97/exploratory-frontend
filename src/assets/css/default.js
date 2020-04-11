import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  navbar: {
    flexGrow: 0,
  },
  mainStyle: {
    flexGrow: 1,
  },
  footer: {
    flexGrow: 0,
  },
}));
