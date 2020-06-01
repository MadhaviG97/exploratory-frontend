import React, { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import NotFound from "../../../components/NotFound/NotFound";
import classNames from "classnames";
import Box from "@material-ui/core/Box";
import { useStyles } from "../../../assets/css/editor";
import ViewPage from "../../../components/editor/DocumentView";

function ViewDocument(props) {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
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
  if (collabs.some((e) => e.researcher_id == user_id)) {
    return (
      <div className={classNames(classes.main2)}>
        <div>
          <ViewPage
            user={user}
            postId={props.match.params.postId}
            group={props.match.params.projectId}
          />
          <Box p={4} />
        </div>
      </div>
    );
  }
  return <NotFound />;
}
export default ViewDocument;
