import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import signUp from "./views/guest-user/sign-up.jsx";
import fillProfile from "./views/researcher/fill-profile";
import AboutUs from "./views/shared/about-us.jsx";
import signIn from "./views/researcher/sign-in";
import Project from "./views/research/home";
import Theme from "./assets/themes/Theme";
import { ThemeProvider } from "@material-ui/core/styles";
import Form from "./views/research/createResearch";

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
            <Route exact path="/aboutus" component={AboutUs} />
            <Route exact path="/project" component={Project} />
            <Route exact path="/create" component={Form} />
          </Switch>
        </div>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
