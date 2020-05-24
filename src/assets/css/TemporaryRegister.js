import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  image: {
    backgroundImage: "url(/exploratory.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 0.9,
  },
  paper: {
    marginTop: theme.spacing(0),
    marginRight: theme.spacing(40),
    padding: theme.spacing(20, 0, 0),
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
  },
}));
