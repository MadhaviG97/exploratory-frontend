import React, { useEffect, useState } from "react";

import classNames from "classnames";
import Box from "@material-ui/core/Box";
import { useStyles } from "../../../assets/css/editor";
import Loader from "../../../components/Loader";
import axios from "axios";
import QuillEditor from "../../../components/editor/QuillEditor";
import { useSelector } from "react-redux";
import NotFound from "../../../components/NotFound/NotFound";
//import axios from 'axios';
//import { useSelector } from "react-redux";
import DocumentrDialog from "../../../components/editor/DocumentDialog";

import NavComponent from "../../../components/AppNavigation/NavigationComponent";

import "../../../assets/css/editor.css";
function CreatePage(props) {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const group = props.match.params.projectId;

  const onEditorChange = (value) => {
    setContent(value);
    console.log(content);
  };
  //below function is not used
  const onFilesChange = (files) => {
    setFiles(files);
  };
  let user_id = 0;
  if (user.userData) {
    user_id = user.userData._id;
  }
  const [collabs, setCollabs] = React.useState([]);
  useEffect(() => {
    const variable = {
      group: group,
    };
    axios.post("/project/get-collaborators", variable).then((response) => {
      if (response.data) {
        setCollabs(response.data);
      }
    });
  }, []);
  if (collabs.length !== 0 && user.userData) {
    if (collabs.some((e) => e.researcher_id == user_id)) {
      return (
        <div>
          <div className={classNames(classes.main, classes.mainRaised)}>
            <Box p={1.7} style={{ background: "#014f82" }}>
              <div className={classes.name}>
                <h1 align="center" className={classes.title}>
                  Editor
                </h1>
              </div>
            </Box>
            <div style={{ maxWidth: "1000px", margin: "1.5rem auto" }}>
              {/*marginTop={7}*/}

              <Box p={1} style={{ display: "flex" }} flexDirection="row">
                <NavComponent projectId={group} />
              </Box>
              <QuillEditor
                placeholder={""}
                onEditorChange={onEditorChange}
                onFilesChange={onFilesChange}
              />

              <div style={{ textAlign: "center", margin: "2rem" }}>
                <DocumentrDialog content={content} group={group} />
              </div>

              <Box p={4} />
            </div>
          </div>
        </div>
      );
    } else {
      return <NotFound />;
    }
  } else {
    return <Loader />;
  }
}

export default CreatePage;
