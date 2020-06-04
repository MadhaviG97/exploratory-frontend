import React from "react";
import ProjectList from "../../components/Feed/ProjectList";
import Box from "@material-ui/core/Box";
import { useSelector } from "react-redux";
import axios from 'axios'


export default function Feed() {

  var user = null
  try {
    const userLogged = useSelector((state) => state.user.userData)
    user = userLogged
  }
  catch (err) { }

  const [feedContent, setFeedContent] = React.useState([]);
  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {

    var paramters = { index: index }
    if (user) {
      paramters = Object.assign({ email: user.email }, paramters)
    }

    var request = axios
      .post("/feed", paramters)
      .then((response) => {
        setFeedContent(response.data)
        setIndex(index + response.data.length)
      })
      .catch(err => {
        console.log(err)
      });

  }, []);

  const loadMore = () => {
    var paramters = { index: index }
    if (user) {
      paramters = Object.assign({ email: user.email }, paramters)
    }
    var request = axios
      .post("/feed", paramters)
      .then((response) => {
        console.log(response.data)
        setFeedContent(feedContent.concat(response.data))
        setIndex(index + response.data.length)
      })
      .catch(err => { });
  }
  const trackScrolling = () => {
    const wrappedElement = document.getElementById('root');
    if (wrappedElement.scrollHeight - wrappedElement.scrollTop === wrappedElement.clientHeight) {
      loadMore()
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', trackScrolling);

    // Specify how to clean up after this effect:
    return () => {
      window.removeEventListener('scroll', trackScrolling);
    };
  });

  return (

    <div style={{ height: '100%', backgroundImage: "url(/images/feed/feedBackground.jpg)" }}>

      <Box display="flex" flexDirection="column">
        <Box flexGrow="1">
          <ProjectList projects={feedContent} />
        </Box>
      </Box>

    </div>

  );
}
