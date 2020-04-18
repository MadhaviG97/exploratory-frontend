import React from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { TextField, InputAdornment, Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "../../assets/css/fill-profile";
import Container from "@material-ui/core/Container";
import DatePicker from "../../components/Forms/FormComponents/date-picker";
import FileUploader from "../../components/Forms/FormComponents/file-uploader";
import InstitutionList from "../../components/Forms/FormComponents/institutionsList";
import CopyRight from "../../components/Navbar/copyRight";

export default function SignUp() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      {/* <CssBaseline /> */}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Your Profile Details
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FileUploader />
            </Grid>
            <Grid item xs={12}>
              <DatePicker />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phone_number"
                label="Mobile Number"
                name="phone_number"
                autoComplete="phone number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+94</InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <InstitutionList formControl={classes.formControl} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-static"
                label="Bio"
                fullWidth
                multiline
                rows="4"
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
          >
            Proceed
          </Button>
        </form>
      </div>
    </Container>
  );
}
