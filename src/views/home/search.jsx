import React from "react";
import SearchList from "../../components/search/SearchList";
import Box from "@material-ui/core/Box";
import { useParams, useHistory } from "react-router-dom";


export default function Search(props) {
  let { string } = useParams();

  return (
    <div style={{ height: "93vh", backgroundImage: "url(/images/feed/feedBackground.jpg)" }}>
        <Box display="flex" flexDirection="column">
      <Box flexGrow="1">
        <main>
          <SearchList
            searchString={string}
          />
        </main>
      </Box>
    </Box>
    </div>
  );
}
