import React from "react";
import SearchList from "../../components/search/SearchList";
import Box from "@material-ui/core/Box";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

export default function Search(props) {
  let { string } = useParams();
  const [searchResult, setSearchResult] = React.useState({
    projects: [],
    researchers: [],
    institutions: [],
  });
  console.log(string);

  React.useEffect(() => {
    var request = axios
      .post("/search", { searchString: string })
      .then((response) => {
        console.log(response);
        setSearchResult(response.data);
        // return response.data;
      });
  }, [string]);

  // console.log("props",props)
  // const searchResult = useSelector((state) => state.project).searchData;

  return (
    <div style={{ height: "93vh", backgroundImage: "url(/images/feed/feedBackground.jpg)" }}>
        <Box display="flex" flexDirection="column">
      <Box flexGrow="1">
        <main>
          <SearchList
            projects={searchResult.projects}
            researchers={searchResult.researchers}
            institutions={searchResult.institutions}
          />
        </main>
      </Box>
    </Box>
    </div>
  );
}
