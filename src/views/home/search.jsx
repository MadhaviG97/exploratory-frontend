import React from "react";
import SearchList from "../../components/search/SearchList";
import Box from "@material-ui/core/Box";
import { useParams, useHistory } from "react-router-dom";


export default function Search(props) {
  let { string } = useParams();

  return (
    <div  style={{
      height: "100%",
      backgroundColor: "#eceff1",
    }}
    >
  <div style={{ height: "99vh", backgroundImage: "url(/images/fileFolder/bg4.png)"}}>
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
    </div>
  
  );
}
