import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";

import signUp from "./views/guest-user/sign-up";
import home from "./views/research/home";
import fillProfile from "./views/researcher/fill-profile"
import signIn from "./views/researcher/sign-in";

import CreatePage from "./views/editor/CreatePage";
import EditPage from "./views/editor/EditPage";

import FileManager from "./views/fileFolder/FileManager";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Theme from "./assets/themes/Theme";
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from "@material-ui/core/styles";

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <ThemeProvider theme={Theme}>
        <Navbar />
        <div  >
          <Switch>
            <Route exact path="/" component={signIn} />
            <Route exact path="/signin" component={signIn} />
            <Route exact path="/signup" component={signUp} />
            <Route exact path="/fillProfile" component={fillProfile} />
            <Route exact path="/document/create" component={CreatePage} />
            <Route exact path="/document/edit" component={EditPage} />
            {/*<Route exact path="/blog/edit/:postId" component={Auth(EditPage, null)} />*/}
            <Route exact path="/document/fileManager" component={FileManager} />
          </Switch>
        </div>
        <Footer />
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
