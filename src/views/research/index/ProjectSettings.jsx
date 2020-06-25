import React, { useEffect } from "react";
//redux
import { useSelector } from "react-redux";
//routing
import { useHistory, useLocation, useParams } from "react-router-dom";
//API call
import axios from "axios";
import EditProject from "../../../components/Forms/EditProject";
import Loader from "../../../components/Loader";

export default function Form(props) {
  let { id } = useParams();
  let history = useHistory();
  let location = useLocation();

  const [validated, setValidated] = React.useState(false);

  useEffect(() => {
    if (!validated && props.user.userData !== undefined) {
      validProject(() =>
        checkUser(() => {
          setValidated(true);
        })
      );
    }
  }, [props.user]);

  function validProject(cb) {
    var request = axios
      .post("/project/is-exist-project", { project_id: id })
      .then(async (response) => {
        if (!response.data) {
          var home_location = location.state || {
            from: { pathname: `/` },
          };
          history.replace(home_location.from);
        } else {
          cb();
        }
      })
      .catch((err) => alert(err.message));
  }

  function isCollaborator(collaborators) {
    let isUser = false;
    var userId = props.user.userData._id;
    collaborators.map((collaborator) => {
      if (collaborator.researcher_id === userId) {
        isUser = true;
      }
    });
    return isUser;
  }

  function checkUser(cb) {
    axios
      .post("/project/get-collaborator-ids", { project_id: id })
      .then((result) => {
        if (!isCollaborator(result.data)) {
          var project_location = location.state || {
            from: { pathname: `/project/viewproject/${id}` },
          };
          history.replace(project_location.from);
        } else {
          cb();
        }
      });
  }

  return (
    <React.Fragment>{!validated ? <Loader /> : <EditProject />}</React.Fragment>
  );
}
