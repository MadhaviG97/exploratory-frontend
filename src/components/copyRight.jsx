import React from "react";
import { Typography, Link } from "@material-ui/core";

export default function Copyright() {
  return (
    <Typography variant="body2" color="textPrimary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Exploratory
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
