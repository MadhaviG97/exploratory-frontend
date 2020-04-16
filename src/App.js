import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import signUp from "./views/guest-user/sign-up.jsx";
import fillProfile from "./views/researcher/fill-profile";
import UserProfile from "./views/researcher/user-profile.jsx";
import AboutUs from "./views/shared/about-us.jsx";
import Forum from "./views/shared/public-forum"
import signIn from "./views/researcher/sign-in";
import Project from "./views/research/home";
import Theme from "./assets/themes/Theme";
import { ThemeProvider } from "@material-ui/core/styles";
// import Modal from "./components/appBar";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThemeProvider theme={Theme}>
        <div>
          <Switch>
            <Route exact path="/" component={AboutUs} />
            <Route exact path="/signin" component={signIn} />
            <Route exact path="/signup" component={signUp} />
            <Route exact path="/fillProfile" component={fillProfile} />
            <Route exact path="/userProfile" component={UserProfile} />
            <Route exact path="/aboutus" component={AboutUs} />
            <Route exact path="/forum" component={Forum} />
            <Route exact path="/project" component={Project} />
            {/* <Route exact path="/modal" component={Modal} /> */}
          </Switch>
        </div>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
