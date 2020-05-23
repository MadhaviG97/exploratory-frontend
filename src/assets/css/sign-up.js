import { makeStyles } from "@material-ui/core/styles";

const img = "images/sign-in/sign-in-" + Math.ceil(Math.random() * 10) + ".jpg";

export default useStyles = makeStyles((theme) => ({
  container: {
    backgroundImage: `url(${img})`,
  },
  background: {
    backgroundImage: "url(/images/sign-up/sign-up.jpg)",
  },
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
