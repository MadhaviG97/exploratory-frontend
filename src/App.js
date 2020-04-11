import React, { Component } from "react";
import "./App.css";
import Body from "./views/guest-user/sign-up";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Theme from "./assets/themes/Theme";
import { ThemeProvider } from "@material-ui/core/styles";
// import { useStyles } from "./assets/css/default";
import { Box } from "@material-ui/core";

class App extends Component {
  state = {
    response: "null",
    register: {
      email: "mad@email.com",
      password: "mad@email.com",
      confirm_password: "mad@email.com",
      first_name: "madavi",
      last_name: "gayathri",
    },
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

  handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post: this.state.register }),
    });

    const body = await response.text();

    this.setState({ responseToPost: body });
    console.log(e.first_name);
  };

  render() {
    // const classes = useStyles();

    return (
      <React.StrictMode>
        <ThemeProvider theme={Theme}>
          <Box>
            <Navbar />
            <main>
              <Body
                response={this.state.response}
                onSubmit={this.handleSubmit}
              />
            </main>
            <Footer />
          </Box>
        </ThemeProvider>
      </React.StrictMode>
    );
  }
}

export default App;
