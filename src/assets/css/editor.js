import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(50),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    //width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"
  },
  mainRaised: {
    margin: "0px 30px 30px 30px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.08), 0 6px 30px 5px rgba(0, 0, 0, 0.06), 0 8px 10px -5px rgba(0, 0, 0, 0.1)"
  },
}))