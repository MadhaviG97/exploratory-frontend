import React from "react";
import ProjectList from "../../components/Feed/ProjectList";
import Box from "@material-ui/core/Box";
import { useSelector } from "react-redux"
const axios = require('axios')

export default function Feed() {

  const user= useSelector((state) => state.user.userData)
  const [feedContent, setFeedContent] = React.useState([]);


  React.useEffect(() => {
    var request = axios
      .post("/feed",{email:user?user.email:""})
      .then((response) => {
        setFeedContent(response.data)
      })
      .catch(err=>{});

  }, [user]);

  if(user==undefined){
    return(<div/>)
  }

  return (
    <Box display="flex" flexDirection="column">
      <Box flexGrow="1">
        <ProjectList projects={feedContent} />
      </Box>
    </Box>
  );
}
