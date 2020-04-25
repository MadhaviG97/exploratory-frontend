import React from "react";
import Navbar from "../../../components/Navbar/Navbar";
import ProjectNavbar from "../../../components/Project/ProjectNavbar";
import Tab from "../../../components/Project/TabPublicMode";
import Footer from "../../../components/Footer/Footer";
import Box from "@material-ui/core/Box";
import { useEffect } from "react";
import { render } from "../../../_actions/project_actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Loader from "../../../components/Loader";
import OverView from "../../../components/Overview/OverViewPublic";
import Team from "../../../components/Team/team";
import Comments from "../../../components/ProjectComments/chathead";

const images = [
  { id: 10001, url: "default-0.jpg", caption: "Image-1" },
  { id: 10002, url: "default-1.jpg", caption: "Image-2" },
  { id: 10003, url: "default-2.jpg", caption: "Image-3" },
];

const collaborators = [];

const comments = [];

function Home() {
  let { id } = useParams();
  var dispatch = useDispatch();
  var project = useSelector((state) => state.project);
  const [state, setState] = React.useState({
    project: {},
    collaborators: [],
    tags: [],
    images: [],
  });
  useEffect(() => {
    if (JSON.stringify(state.project) === JSON.stringify({})) {
      var request = axios
        .post("/project/view-project", { id: id })
        .then((response) => {
          return response.data;
        });
      dispatch(render(request)).then((response) => {
        setState({ ...state, project: response });
        console.log(response);
      });
    }
  }, [dispatch, id, state, setState, state.project, axios]);

  const Page = () => {
    return (
      <React.Fragment>
        <ProjectNavbar
          comments="5"
          followers="2"
          updates="8"
          projectName={project.project.title}
          authour={project.admins[0].first_name
            .concat(" ")
            .concat(project.admins[0].last_name)}
          authour_image={project.admins[0].profile_picture}
          description={project.project.description}
        />
        <Tab OverView={getOverView} Team={getTeam} Comments={Comments} />
      </React.Fragment>
    );
  };

  const getOverView = () => {
    return <OverView images={project.images} />;
  };

  const getTeam = () => {
    return <Team collaborators={project.collaborators} />;
  };

  const getComments = () => {
    return <Comments comments={comments} />;
  };

  return (
    <React.Fragment>
      <Box display="flex" flexDirection="column" style={{ height: "100vh" }}>
        <Box>
          <Navbar />
        </Box>
        <Box flexGrow="1">
          {JSON.stringify(state.project) === JSON.stringify({}) ? (
            <Loader />
          ) : (
            <Page />
          )}
        </Box>
        <Box>
          <Footer />
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default Home;
