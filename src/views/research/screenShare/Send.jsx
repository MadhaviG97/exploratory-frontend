import React from "react";
import classNames from "classnames";
import { useEffect } from "react";
import axios from "axios";
import Box from "@material-ui/core/Box";
import { useStyles } from "../../../assets/css/projectFolderGrid";
import Sender from "../../../components/ScreenShare/Sender";
import { useSelector } from "react-redux";
import NavComponent from "../../../components/AppNavigation/NavigationComponent";
import Divider from "@material-ui/core/Divider";
import NotFound from "../../../components/NotFound/NotFound";
import Loader from "../../../components/Loader";

export default function Receive(props) {
  const user = useSelector((state) => state.user);
  console.log(user);
  const classes = useStyles();
  let user_id = 0;
  if (user.userData) {
    user_id = user.userData._id;
  }
  const [collabs, setCollabs] = React.useState([]);
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
          <div style={{ width: "70%", margin: "1rem auto" }}>
            <NavComponent projectId={props.match.params.projectId} />

            <Divider variant="fullWidth" />
            <Box p={0.5} />
            {/*
                            <Box boxShadow={3} style={{  background: '#FFFFFF'}} >
                                <Box p={0.5}>
                                    <div >
                                        <h1 align='center' className={classes.topic}>Share Your Screen with Project members</h1>
                                    </div>
                                </Box>
                            </Box>
                       
                        */}
          </div>
          <div>
            <Sender group={props.match.params.projectId} user={user} />
          </div>
          <Box p={5} />
        </div>
      );
    } else {
      return <NotFound />;
    }
  } else {
    return <Loader />;
  }
}
