import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import NoteIcon from "@material-ui/icons/Note";
import Favorite from "@material-ui/icons/Favorite";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import ListIcon from "@material-ui/icons/List";
// core components
import NavBar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer.jsx";
import Button from "../../components/CustomButtons/Button.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import NavPills from "../../components/NavPills/NavPills.js";
import Parallax from "../../components/Parallax/Parallax.js";
import UserTable from "../../components/UserProfileSections/TableSection";
import Posts from "../../components/UserProfileSections/PostSection";

import profile from "../../assets/images/user-profile/faces/marc.jpg";

import publication1 from "../../assets/images/user-profile/examples/photo1.jpeg";
import publication2 from "../../assets/images/user-profile/examples/photo2.png";
import publication3 from "../../assets/images/user-profile/examples/photo3.jpg";

import styles from "../../assets/jss/material-kit-react/views/profilePage.js";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  return (
    <div>
      <NavBar />
      <Parallax
        small
        filter
        image={require("../../assets/images/user-profile/profile-bg.jpg")}
      />

      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img src={profile} alt="..." className={imageClasses} />
                  </div>
                  <div className={classes.name}>
                    <h1 className={classes.title}>Kamal Perera</h1>
                    <h3>Scientist</h3>
                    <IconButton aria-label="LinkedIn" href="">
                      <LinkedInIcon />
                    </IconButton>
                    <IconButton aria-label="Twitter" href="">
                      <TwitterIcon />
                    </IconButton>
                    <IconButton aria-label="Facebook" href="">
                      <FacebookIcon />
                    </IconButton>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <div className={classes.description}>
              <p>
                Directed art history research on famous artists utilizing major
                museums and libraries across the United States, Germany, France
                and England. Worked in Paris to instruct business professional
                on the English language to enhance presentations and
                correspondence. Utilized bilingual ability to create, prepare
                and implement language lesson plans for young children up to
                adults. Chosen for prestigious internship program at one of the
                top museums in the world. Taught French class at U.S. university
                and received letter of recommendation. Assisted with the process
                of evaluating, cataloging and indexing collections for the
                institution. Researched artist for exhibit-related educational
                program. Conducted several presentations son influential artists
                at the University of Paris.
              </p>
              <Button variant="contained" color="primary">
                Edit Profile Info
              </Button>
            </div>
            <NavPills
              alignCenter
              color="primary"
              tabs={[
                {
                  tabButton: "Posts",
                  tabIcon: ListIcon,
                  tabContent: (
                    <GridContainer justify="center">
                      <GridItem xs={12} sm={6}>
                        <Posts />
                      </GridItem>
                    </GridContainer>
                  ),
                },
                {
                  tabButton: "Publications",
                  tabIcon: NoteIcon,
                  tabContent: (
                    <GridContainer justify="center">
                      <GridItem xs={12} sm={6} md={4}>
                        <img
                          alt="..."
                          src={publication1}
                          className={navImageClasses}
                        />
                        <img
                          alt="..."
                          src={publication2}
                          className={navImageClasses}
                        />
                        <img
                          alt="..."
                          src={publication3}
                          className={navImageClasses}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={6} md={4}>
                        <img
                          alt="..."
                          src={publication2}
                          className={navImageClasses}
                        />
                        <img
                          alt="..."
                          src={publication3}
                          className={navImageClasses}
                        />
                        <img
                          alt="..."
                          src={publication1}
                          className={navImageClasses}
                        />
                      </GridItem>
                    </GridContainer>
                  ),
                },
                {
                  tabButton: "Projects",
                  tabIcon: LibraryBooksIcon,
                  tabContent: <UserTable />,
                },
              ]}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
