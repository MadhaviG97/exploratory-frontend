import React from "react";
import Navbar from "../../../components/Navbar/Navbar";
import ProjectNavbar from "../../../components/Project/ProjectNavbar";
import Tab from "../../../components/Project/TabPrivateMode";
import Footer from "../../../components/Footer/Footer";
import Box from "@material-ui/core/Box";
import { useParams } from "react-router-dom";
export default function Home(props) {
  let { id } = useParams();
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
            projectId={id}
            projectName="Automated Inter-artefact Traceability Establishment for DevOps Practice"
            authour="Gamlath Perera"
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
