import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";

import signUp from "./views/guest-user/sign-up.jsx";
import fillProfile from "./views/researcher/fill-profile";
import AboutUs from "./views/shared/about-us.jsx";
import signIn from "./views/researcher/sign-in";
import Auth from "./hoc/auth";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Theme from "./assets/themes/Theme";
import { ThemeProvider } from "@material-ui/core/styles";


import CreatePage from "./views/research/editor/CreatePage";
import EditPage from "./views/research/editor//EditPage";
import FileManager from "./views/research/fileFolder/FileManager";
import ProjectFolder from "./views/research/fileFolder/ProjectFolder";

import Project from "./views/research/home";

// import Modal from "./components/appBar";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThemeProvider theme={Theme}>
        <div>
          <Switch>
            <Route exact path="/" component={Auth(AboutUs,null)} />
            <Route exact path="/signin" component={Auth(signIn,false)} />
            <Route exact path="/signup" component={Auth(signUp,false)} />
            <Route exact path="/fillProfile" component={Auth(fillProfile,true)} />
            <Route exact path="/aboutus" component={Auth(AboutUs,null)} />
            <Route exact path="/document/create" component={Auth(CreatePage,true)} />
            {/*<Route exact path="/document/edit" component={EditPage} />
            <Route exact path="/blog/edit/:postId" component={Auth(EditPage, null)} />*/}
            <Route exact path="/document/projectfolder" component={Auth(ProjectFolder,null)} />
            <Route exact path="/document/filemanager" component={Auth(FileManager,null)} />
            <Route exact path="/project" component={Auth(Project,null)} />
            {/* <Route exact path="/modal" component={Modal} /> */}
          </Switch>
        </div>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
