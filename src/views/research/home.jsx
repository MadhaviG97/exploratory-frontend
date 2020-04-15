import React from "react";
import Navbar from "../../components/Navbar/NavbarProject";
import ProjectNavbar from "./projectNavbar";
import Tab from "../../components/Tab";
import Paper from "@material-ui/core/Paper";
import Footer from "../../components/Footer/Footer";
import Box from "@material-ui/core/Box";
export default function Home(props) {
  return (
    <React.Fragment>
      <Box display="flex" flexDirection="column" style={{ height: "100vh" }}>
        <Box>
          <Navbar />
        </Box>
        <Box flexGrow="1">
          <ProjectNavbar
            comments="5"
            followers="2"
            updates="8"
            projectName="Automated Inter-artefact Traceability Establishment for DevOps Practice"
            authour="Charunie Prabodha"
            description="Showcase your professional experience and education to help potential employers and collaborators find and contact you about career opportunities."
          />
          <Tab />
        </Box>
        <Box>
          <Footer />
        </Box>
      </Box>
    </React.Fragment>
  );
}
