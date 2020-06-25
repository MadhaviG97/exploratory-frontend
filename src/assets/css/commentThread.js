import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    alignItems: "center",
    padding: theme.spacing(1),
  },
  heading: {
    fontSize: theme.typography.pxToRem(14),
    flexBasis: "33.33%",
    flexShrink: 0,
    padding: theme.spacing(0, 4),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(12),
    color: theme.palette.text.secondary,
    padding: theme.spacing(0, 4),
  },
  firstComment: {
    fontSize: theme.typography.pxToRem(14),
    color: theme.palette.text.primary,
    padding: theme.spacing(0, 4),
  },
  newComment: {
    padding: theme.spacing(2, 2, 1),
  },
  // paper:{
  //   minWidth:
  // }
}));
