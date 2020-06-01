import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import NotFound from "../../../components/NotFound/NotFound";
import classNames from "classnames";
import Box from "@material-ui/core/Box";
import { useStyles } from "../../../assets/css/editor";
import NavComponent from "../../../components/AppNavigation/NavigationComponent";
import Grid from "@material-ui/core/Grid";
import Loader from "../../../components/Loader";
import "../../../assets/css/editor.css";

//import '../../../assets/css/editor.css';
import YJSQuill from "../../../components/editor/YjsQuill";

function Edit2Page(props) {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  console.log(user);
  let user_id = 0;
  if (user.userData) {
    user_id = user.userData._id;
  }
  const [collabs, setCollabs] = useState([]);
  useEffect(() => {
    const variable = {
      group: props.match.params.projectId,
    };
    axios.post("/project/get-collaborators", variable).then((response) => {
      if (response.data) {
        setCollabs(response.data);
      }
    });
  }, []);
  if (user.userData) {
    if (collabs.some((e) => e.researcher_id == user_id)) {
      return (
        <div className={classNames(classes.main2)}>
          <div className={classNames(classes.main2, classes.mainRaised3)}>
            <Grid container spacing={5} direction="row">
              <Grid item xs={3} align="right">
                <Box>
                  <NavComponent projectId={props.match.params.projectId} />
                </Box>
              </Grid>

              <Grid item xs={8}>
                <Box boxShadow={2} flexDirection="row">
                  <Box p={1} style={{ background: "#FFFFFF" }}>
                    <h1 align="center" className={classes.topic4}>
                      Editor
                    </h1>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Box p={1.5} />
            <YJSQuill
              user={user}
              variable={props.match.params.postId}
              group={props.match.params.projectId}
            />
            <Box p={3} />
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

export default Edit2Page;
