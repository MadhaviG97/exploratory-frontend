import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import FooterStyle from "../../assets/css/FooterStyle";
//this is the footer 2 the darker one at the bottom
import Copyright from "../copyRight";

export default function Footer() {
  const classes = FooterStyle();
  return (
    <div>
      <CssBaseline />
      <footer className={classes.footer2}>
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}
