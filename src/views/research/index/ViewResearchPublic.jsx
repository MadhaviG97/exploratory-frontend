import React from "react";
import ProjectNavbar from "../../../components/Project/ProjectNavbar";
import Tab from "../../../components/Project/TabPublicMode";
import Box from "@material-ui/core/Box";
import { useEffect } from "react";
import {
  render,
  getRelatedImages,
  getFinalPaper,
} from "../../../_actions/project_actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Loader from "../../../components/Loader";
import OverView from "../../../components/Overview/OverViewPublic";
import Team from "../../../components/Team/team";
import Comments from "../../../components/ProjectComments/chathead";
import FilesList from "../../../components/ProjectPublicFiles/DisplayList";
import Drawer from "../../../components/Project/Drawer";
function Home() {
  let { id } = useParams();
  var dispatch = useDispatch();
  var project = useSelector((state) => state.project);
  const [files, setFiles] = React.useState([]);
  const [state, setState] = React.useState({
    loaded: false,
    collaborators: [],
    tags: [],
  });

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (!state.loaded) {
        let config = {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        };
        const variables = {
          group: id,
        };
        axios
          .post("/drive/getpublicfiles", variables, config)
          .then((response) => {
            if (response.data.success) {
              console.log(response.data.files);
              setFiles(response.data.files);
            } else {
              console.log("not");
              alert("Could not get files ");
            }
          });

        var request = axios
          .post("/project/view-project", { id: id })
          .then((response) => {
            return response.data;
          })
          .catch((err) => console.log(err.message));

        dispatch(render(request))
          .then((response) => {
            setState({
              ...state,
              loaded: true,
            });
          })
          .catch((err) => setState({ ...state, loaded: true }));
      }
    }
    return () => (mounted = false);
  }, []);

  const Page = () => {
    return (
      <React.Fragment>
        <ProjectNavbar
          comments="5"
          followers="2"
          updates="8"
          projectName={project.project.title}
          projectId={id}
          authour={project.admins[0].first_name
            .concat(" ")
            .concat(project.admins[0].last_name)}
          authour_image={project.admins[0].profile_picture}
          description={project.project.description}
        />
        {/* <Drawer /> */}
        <Tab
          OverView={getOverView}
          Team={getTeam}
          Comments={getComments}
          Files={getFiles}
        />
      </React.Fragment>
    );
  };

  const getOverView = () => {
    return <OverView />;
  };

  const getTeam = () => {
    return (
      <Team collaborators={[...project.admins, ...project.collaborators]} />
    );
  };

  const getComments = () => {
    if (project.comments) {
      return <Comments comments={project.comments} />;
    } else {
      return <Comments comments={[]} />;
    }
  };
  const getFiles = () => {
    return <FilesList files={files} />;
  };

  return (
    <React.Fragment>
      <Box display="flex" flexDirection="column" style={{ height: "100vh" }}>
        <Box flexGrow="1">{!state.loaded ? <Loader /> : <Page />}</Box>
      </Box>
    </React.Fragment>
  );
}

export default Home;
