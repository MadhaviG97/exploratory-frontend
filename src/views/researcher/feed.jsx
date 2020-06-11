import React from "react";
import ProjectList from "../../components/Feed/ProjectList";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import axios from "axios";
import ReactLoading from "react-loading";


const useStyles = makeStyles((theme) => ({
  loader: {
    height: 550,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
}));

export default function Feed() {
  const classes = useStyles();
  var user = null;
  try {
    const userLogged = useSelector((state) => state.user.userData);
    user = userLogged;
  } catch (err) { }

  const [feedContent, setFeedContent] = React.useState([]);
  const [index, setIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    var paramters = { index: index };
    if (user) {
      paramters = Object.assign({ email: user.email }, paramters);
    }

    var request = axios
      .post("/feed", paramters)
      .then((response) => {
        console.log(response.data);
        setLoading(false)
        setFeedContent(response.data);
        setIndex(index + response.data.length);
      })
      .catch((err) => {
        setLoading(false)
        // console.log(err);
      });
  }, []);

  const loadMore = () => {
    var paramters = { index: index };
    if (user) {
      paramters = Object.assign({ email: user.email }, paramters);
    }
    var request = axios
      .post("/feed", paramters)
      .then((response) => {
        // console.log(response.data)
        setFeedContent(feedContent.concat(response.data));
        setIndex(index + response.data.length);
      })
      .catch((err) => { });
  };
  const trackScrolling = () => {
    const wrappedElement = document.getElementById("root");
    if (
      wrappedElement.scrollHeight - wrappedElement.scrollTop ===
      wrappedElement.clientHeight
    ) {
      loadMore();
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", trackScrolling);

    // Specify how to clean up after this effect:
    return () => {
      window.removeEventListener("scroll", trackScrolling);
    };
  });

  return (

    <div>

      {loading ? (
        <div className={classes.loader}
          style={{
            height: "100%",
            backgroundImage: "url(/images/feed/feedBackground.jpg)",
          }}>
          <ReactLoading
            type="spinningBubbles"
            color="#5054CC"
            height={550}
            width={50}
          />
        </div>
      ) : (
          <div
            style={{
              height: "100%",
              backgroundImage: "url(/images/feed/feedBackground.jpg)",
            }}
          >
            <Box display="flex" flexDirection="column">
              <Box flexGrow="1">
                <ProjectList projects={feedContent} />
              </Box>
            </Box>
          </div>
        )}
    </div>


  );
}
