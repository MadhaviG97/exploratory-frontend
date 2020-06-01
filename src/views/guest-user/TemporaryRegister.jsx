import React from "react";
import Box from "@material-ui/core/Box";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/Navbar/Navbar";
import Parallax from "../../components/Parallax/Parallax.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import styles from "../../assets/jss/material-kit-react/views/landingPage";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(styles);

export default function SignIn() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Parallax
        filter
        image={require("../../assets/images/About-us/about-us-bg3.jpg")}
      >
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={8}>
              <Typography variant="h2" gutterBottom>
                EXPLORATORY
              </Typography>
              <Typography variant="h5" gutterBottom>
                Please check Your Email to proceed..
              </Typography>
              <IconButton color="primary" aria-label="LinkedIn" href="">
                <LinkedInIcon />
              </IconButton>
              <IconButton color="primary" aria-label="Twitter" href="">
                <TwitterIcon />
              </IconButton>
              <IconButton color="primary" aria-label="Facebook" href="">
                <FacebookIcon />
              </IconButton>
              <br />
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
    </React.Fragment>
  );
}
