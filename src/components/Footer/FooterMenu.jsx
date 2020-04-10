import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import FooterStyle from "./FooterStyle";

//this the footer 1 the lighter one

export default function FooterMenu() {
  const classes = FooterStyle();
  return (
    <div>
      <CssBaseline />
      <footer className={classes.footer1}>
        <Container maxWidth="sm"></Container>
      </footer>
    </div>
  );
}
