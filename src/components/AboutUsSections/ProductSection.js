import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import GroupIcon from "@material-ui/icons/Group";
import ForumIcon from "@material-ui/icons/Forum";
import ScreenShareIcon from "@material-ui/icons/ScreenShare";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import AddBoxIcon from "@material-ui/icons/AddBox";
// core components
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import InfoArea from "../../components/InfoArea/InfoArea.js";


import styles from "../../assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);


export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={0}>
          <h2 className={classes.title}>Why Exploratory...?</h2>
          <h5 className={classes.description}>
            Generally researchers use different applications to achieve
            different tasks for a research project, such as google drive to
            store documents, team viewer to share screens, google docs to write
            the papers and so on. And there is no common platform to get
            connected with other researches of similar interest and do research
            activities. Therefore having an application that can help the
            researchers get all the facilities mentioned above in one
            application and work collaboratively is helpful and Team Exploratory
            {"'"}s objective is to provide such a platform for researchers.
          </h5>
          <h4 className={classes.title} >What are exciting...</h4>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Researcher Groups"
              description="Researchers can create groups and add collaborators to work for a perticular project."
              icon={GroupIcon}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Group Chats"
              description="Researcher groups provide the Group Chat facility for all the researchers working within a group."
              icon={Chat}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Research Forums"
              description=" Researchers can ask any question through the
              forum from any researcher and answer any existing question."
              icon={ForumIcon}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Projects"
              description="Researchers can publish their projects and papers related to projects publicly."
              icon={LibraryBooksIcon}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Screen Share"
              description=" Researchers can share their screens among
              collaborators. They can also create whiteboards and edit them in real time.
              "
              icon={ScreenShareIcon}
              iconColor="info"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="File Manager"
              description="Researchers can upload their files and folders to a workspace and store necessary documents there."
              icon={AddBoxIcon}
              iconColor="info"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
