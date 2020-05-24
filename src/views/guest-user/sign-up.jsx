import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { TextField, InputAdornment } from "@material-ui/core";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";

import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "../../assets/css/sign-in";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Paper from "@material-ui/core/Paper";
//redux
import axios from "axios";

//routing
import { useHistory, useLocation } from "react-router-dom";

export default function SignUp(props) {
  const classes = useStyles();

  let history = useHistory();
  let location = useLocation();

  const [values, setValues] = React.useState({
    email: {
      error: false,
      helperText: "",
      value: "",
    },
    password: {
      error: false,
      helperText: "",
      value: "",
    },
    confirm_password: {
      error: false,
      helperText: "",
      value: "",
    },
    first_name: {
      error: false,
      helperText: "",
      value: "",
    },
    last_name: {
      error: false,
      helperText: "",
      value: "",
    },
    showPassword: false,
    showConfirmPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: { value: event.target.value } });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function validateEmail(value) {
    let error;

    if (!value) {
      error = "Required!";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address!";
    }
    console.log(error);
    return error;
  }

  function validateNames(value) {
    let error;
    if (!value) {
      error = "Required!";
    } else if (typeof value !== "string") {
      error = "String needed";
    }
    console.log(error);

    return error;
  }

  function validateConfirmPassword(password, confirm_password) {
    let error;
    if (confirm_password == 0) {
      error = "Required!";
    } else if (password !== confirm_password) {
      error = "Confirm Password is not correct!";
    }
    console.log(error);

    return error;
  }

  function validatePassword(password) {
    let error;
    var characters = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    if (password.length == 0) {
      error = "Required!";
    } else if (password.length < 6) {
      error = "Length should be minimum 8!";
    } else if (!password.match(characters)) {
      error =
        "should contain at least one numeric digit and a special character";
    }
    console.log(error);

    return error;
  }

  const ValidateForm = () => {
    var first_name = validateNames(values.first_name.value);
    var last_name = validateNames(values.last_name.value);
    var email = validateEmail(values.email.value);
    var password = validatePassword(values.password.value);
    var confirm_password = validateConfirmPassword(
      values.password.value,
      values.confirm_password.value
    );

    if (first_name || last_name || email || password || confirm_password) {
      if (first_name) {
        setValues({
          ...values,
          first_name: {
            value: values.first_name.value,
            error: true,
            helperText: first_name,
          },
        });
      } else if (last_name) {
        setValues({
          ...values,
          last_name: {
            value: values.last_name.value,
            error: true,
            helperText: last_name,
          },
        });
      } else if (email) {
        setValues({
          ...values,
          email: {
            value: values.email.value,
            error: true,
            helperText: email,
          },
        });
      } else if (password) {
        setValues({
          ...values,
          password: {
            value: values.password.value,
            error: true,
            helperText: password,
          },
        });
      } else if (confirm_password) {
        setValues({
          ...values,
          confirm_password: {
            value: values.confirm_password.value,
            error: true,
            helperText: confirm_password,
          },
        });
      }

      return true;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ValidateForm()) {
      const formData = {
        email: values.email.value,
        password: values.password.value,
        first_name: values.first_name.value,
        last_name: values.last_name.value,
      };
      console.log(formData);
      await axios
        .post(`/temp-register`, formData)
        .then(async (result) => {
          console.log(result.data.inserted_id);
          await axios
            .post("/email/join-exploratory", {
              name: `${values.first_name.value} ${values.last_name.value}`,
              email: values.email.value,
              message: result.data.inserted_id,
            })
            .then((res) => {
              console.log(res);
              let { from } = location.state || {
                from: {
                  pathname: `/user/temporary-register/${result.data.inserted_id}`,
                },
              };
              history.replace(from);
            })
            .catch((e) => console.log(e.message));
        })
        .catch((e) => console.log(e.message));
    }
  };

  return (
    <React.Fragment>
      <Navbar />
      <Grid container component="main" className={classes.root}>
        <CssBaseline />

        <Grid item xs={false} sm={4} md={4} className={classes.image} />
        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
          {/* <Paper elevation={6} spacing={3}> */}
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign-Up
            </Typography>

            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="first_name"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    autoComplete="name"
                    onChange={handleChange("first_name")}
                    helperText={values.first_name.helperText}
                    error={values.first_name.error}
                    value={values.first_name.value}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="last_ame"
                    autoComplete="name"
                    onChange={handleChange("last_name")}
                    helperText={values.last_name.helperText}
                    error={values.last_name.error}
                    value={values.last_name.value}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={handleChange("email")}
                    helperText={values.email.helperText}
                    error={values.email.error}
                    value={values.email.value}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    error={values.password.error}
                    value={values.password.value}
                    onChange={handleChange("password")}
                    helperText={values.password.helperText}
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

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type={values.showConfirmPassword ? "text" : "password"}
                    helperText={values.confirm_password.helperText}
                    error={values.confirm_password.error}
                    value={values.confirm_password.value}
                    onChange={handleChange("confirm_password")}
                    label="Confirm Password"
                    id="Confirm-Password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showConfirmPassword ? (
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          {/* </Paper> */}
        </Grid>
        <Grid item xs={false} sm={4} md={4} className={classes.image} />
      </Grid>
      <Footer />
    </React.Fragment>
  );
}
