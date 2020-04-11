import React, { Component } from "react";
import "./App.css";
import Body from "./views/researcher/sign-in";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Theme from "./assets/themes/Theme";
import { ThemeProvider } from "@material-ui/core/styles";
// import { useStyles } from "./assets/css/default";
import { Box } from "@material-ui/core";

class App extends Component {
  state = {
    response: "null",
    register: "",
    responseToPost: "not yet",
  };

  componentDidMount() {
    this.callApi()
      .then((res) => this.setState({ response: res.message }))
      .catch((err) => console.log(err));
  }

  callApi = async () => {
    try {
      const response = await fetch("/home");
      const body = await response.json();
      return body;
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <React.StrictMode>
        <ThemeProvider theme={Theme}>
          <Box>
            <Navbar />
            <main>
              <Body />
            </main>
            <Footer />
          </Box>
        </ThemeProvider>
      </React.StrictMode>
    );
  }
}

export default App;
