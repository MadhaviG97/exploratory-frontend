import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "../../assets/css/sign-in";
import { InputAdornment } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import { useHistory, useLocation } from "react-router-dom";
import { loginUser } from "../../_actions/user_actions";
import { useDispatch } from "react-redux";

export default function SignInSide() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [values, setValues] = React.useState({
    password: "",
    email: "",
    showPassword: false,
    error: false,
    helperTextEmail: "",
    helperTextPassword: "",
  });

  const [submit, setSubmit] = React.useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e, cb) => {
    e.preventDefault();

    if (values.email.length === 0) {
      setValues({
        ...values,
        error: true,
        helperTextPassword: "",
        helperTextEmail: "Required!",
      });
    } else if (values.password.length === 0) {
      setValues({
        ...values,
        error: true,
        helperTextPassword: "Required!",
        helperTextEmail: "",
      });
    } else if (values.password.length < 6) {
      setValues({
        ...values,
        error: true,
        helperTextPassword: "Password length too short!",
        helperTextEmail: "",
      });
    } else {
      const formData = {
        email: values.email,
        password: values.password,
      };

      dispatch(loginUser(formData))
        .then((result) => {
          var status = result.payload.status;
          var data = result.payload.data;
          if (status === 200) {
            cb();
          } else if (status === 406) {
            setValues({
              ...values,
              error: true,
              helperTextPassword: data.error,
              helperTextEmail: data.error,
            });
          } else if (status === 401) {
            setValues({
              ...values,
              error: true,
              helperTextPassword: data.error,
              helperTextEmail: "",
            });
          } else if (status === 404) {
            setValues({
              ...values,
              error: true,
              helperTextEmail: data.error,
              helperTextPassword: "",
            });
          } else if (status === 400) {
            setValues({
              ...values,
              error: true,
              helperTextEmail: "",
              helperTextPassword: data.error,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  return (
    <div>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />

        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper} data-testid="form">
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    error={values.error}
                    helperText={values.helperTextEmail}
                    id="email"
                    inputProps={{
                      "data-testid": "emailInput",
                    }}
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={handleChange("email")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    error={values.password.error}
                    value={values.password.value}
                    error={values.error}
                    helperText={values.helperTextPassword}
                    onChange={handleChange("password")}
                    type={values.showPassword ? "text" : "password"}
                    label="Password"
                    id="Password"
                    // className={clsx(classes.margin, classes.textField)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                  />
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  data-testid="submit"
                  className={classes.submit}
                  onClick={(e) =>
                    handleSubmit(e, () => {
                      history.replace(from);
                    })
                  }
                >
                  Sign In
                </Button>
              </Grid>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
