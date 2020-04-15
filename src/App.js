
import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import signUp from "./views/guest-user/sign-up.jsx";
import home from "./views/research/home";
import fillProfile from "./views/researcher/fill-profile";
import AboutUs from "./views/shared/about-us.jsx";
import signIn from "./views/researcher/sign-in";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Theme from "./assets/themes/Theme";
import { ThemeProvider } from "@material-ui/core/styles";

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <ThemeProvider theme={Theme}>
        <div  >
          <Switch>
            <Route exact path="/" component={signUp} />
            <Route exact path="/signin" component={signIn} />
            <Route exact path="/signup" component={signUp} />
            <Route exact path="/fillProfile" component={fillProfile} />
            <Route exact path="/aboutus" component={AboutUs} />
          </Switch>
        </div>
      </ThemeProvider>
    </Suspense>
  );

}

export default App;
