import React from "react";

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

// @material-ui/icons
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

// core components
import NavBar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Parallax from "../../components/Parallax/Parallax.js";
import Button from "../../components/CustomButtons/Button.js";

import styles from "../../assets/jss/material-kit-react/views/landingPage";

// Sections for this page
import ProductSection from "../../components/AboutUsSections/ProductSection";
import TeamSection from "../../components/AboutUsSections/TeamSection";
import ContactSection from "../../components/AboutUsSections/ContactSection";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <NavBar />
      <Parallax
        filter
        image={require("../../assets/images/About-us/about-us-bg2.jpg")}
      >
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={6} >
              <h1 className={classes.title} >EXPLORATORY</h1>
              <h3>
                World{"'"}s most popular web portal connecting Researchers and
                Research Groups....
              </h3>
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
            <GridItem xs={6} align="center">
              <Button
                variant="contained"
                color="primary"
                href="/signup"
                size="large"
              >
                Join For Free
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection />
          <TeamSection />
          <ContactSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}
