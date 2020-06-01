import React from "react";
import Box from "@material-ui/core/Box";
import { useStyles } from "../../assets/css/editor";
function NotFound(props) {
  const classes = useStyles();
  return (
    <div className={classes.main2}>
      <div
        className="Document View"
        style={{ width: "60%", margin: "3rem auto" }}
      >
        <Box boxShadow={2} style={{ background: "#FFFFFF" }}>
          <img
            src={process.env.PUBLIC_URL + "/images/appnav/error.png"}
            alt={"page not found"}
          />
        </Box>
      </div>
    </div>
  );
}

export default NotFound;
