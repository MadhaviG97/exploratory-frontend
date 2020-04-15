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
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";

import styles from "../../assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

import team1 from "../../assets/images/About-us/about-us-damika.jpg";
import team2 from "../../assets/images/About-us/about-us-madhavi.jpg";
import team3 from "../../assets/images/About-us/about-us-yogya.jpg";
import team4 from "../../assets/images/About-us/about-us-janith.png";

const useStyles = makeStyles(styles);

export default function TeamSection() {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Our Team - Team GeeFour</h2>
      <div>
        <GridContainer>
          <GridItem xs={3}>
            <Card plain>
              <GridItem xs={12} sm={12} md={4} className={classes.itemGrid}>
                <img src={team1} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Damika Gamlath
                <br />
                <small className={classes.smallTitle}>Web Developer</small>
              </h4>
              <CardFooter className={classes.justifyCenter}>
                <IconButton aria-label="LinkedIn" href="">
                  <LinkedInIcon />
                </IconButton>
                <IconButton aria-label="Twitter" href="">
                  <TwitterIcon />
                </IconButton>
                <IconButton aria-label="Facebook" href="">
                  <FacebookIcon />
                </IconButton>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={3}>
            <Card plain>
              <GridItem xs={12} sm={12} md={4} className={classes.itemGrid}>
                <img src={team2} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Madhavi Gayathri
                <br />
                <small className={classes.smallTitle}>Web Developer</small>
              </h4>
              <CardFooter className={classes.justifyCenter}>
                <IconButton aria-label="LinkedIn" href="">
                  <LinkedInIcon />
                </IconButton>
                <IconButton aria-label="Twitter" href="">
                  <TwitterIcon />
                </IconButton>
                <IconButton aria-label="Facebook" href="">
                  <FacebookIcon />
                </IconButton>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={3}>
            <Card plain>
              <GridItem xs={12} sm={12} md={4} className={classes.itemGrid}>
                <img src={team3} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Yogya Gamage
                <br />
                <small className={classes.smallTitle}>Web Developer</small>
              </h4>
              <CardFooter className={classes.justifyCenter}>
                <IconButton aria-label="LinkedIn" href="">
                  <LinkedInIcon />
                </IconButton>
                <IconButton aria-label="Twitter" href="">
                  <TwitterIcon />
                </IconButton>
                <IconButton aria-label="Facebook" href="">
                  <FacebookIcon />
                </IconButton>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={3}>
            <Card plain>
              <GridItem xs={12} sm={12} md={4} className={classes.itemGrid}>
                <img src={team4} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Janith Pasindu
                <br />
                <small className={classes.smallTitle}>Web Developer</small>
              </h4>
              <CardFooter className={classes.justifyCenter}>
                <IconButton aria-label="LinkedIn" href="">
                  <LinkedInIcon />
                </IconButton>
                <IconButton aria-label="Twitter" href="">
                  <TwitterIcon />
                </IconButton>
                <IconButton aria-label="Facebook" href="">
                  <FacebookIcon />
                </IconButton>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
