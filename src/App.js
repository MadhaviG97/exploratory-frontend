import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import signUp from "./views/guest-user/sign-up.jsx";
import fillProfile from "./views/researcher/fill-profile";
import UserProfile from "./views/researcher/user-profile.jsx";
import AboutUs from "./views/shared/about-us.jsx";
import Forum from "./views/shared/public-forum";
import signIn from "./views/researcher/sign-in";

import Feed from "./views/researcher/feed";
import Search from "./views/home/search";

//hoc
import Auth from "./hoc/auth";
import { compose } from "redux";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Theme from "./assets/themes/Theme";
import { ThemeProvider } from "@material-ui/core/styles";

import CreatePage from "./views/research/editor/CreatePage";
import EditPage from "./views/research/editor/EditPage";
import EditorBlog from "./views/research/editor/EditorBlog";
import FileManager from "./views/research/fileFolder/FileManager";
import ProjectFolder from "./views/research/fileFolder/ProjectFolder";

//project
import ProjectPublic from "./views/research/index/ViewResearchPublic";
import ProjectPrivate from "./views/research/index/ViewResearchPrivate";
import CreateProject from "./views/research/index/CreateResearch";
import CompareDoc from "./views/research/fileFolder/CompareDoc";
import ProjectSettings from "./views/research/index/ProjectSettings";

import Project from "./views/research/index/ViewResearchPublic";
import ScreenShare from "./views/research/screenShare/ScreenShare"
import Receive from "./views/research/screenShare/Receive"
import Send from "./views/research/screenShare/Send"

import Demo from "./views/whiteboard/Demo";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThemeProvider theme={Theme}>
        <div>
          <Switch>
            <Route exact path="/" component={Auth(Feed, true)} />
            <Route
              exact
              path="/search/:string"
              component={Auth(Search, true)}
            />
            <Route exact path="/signin" component={Auth(signIn, false)} />
            <Route exact path="/signup" component={Auth(signUp, false)} />
            <Route
              exact
              path="/fillProfile"
              component={Auth(fillProfile, true)}
            />
            <Route exact path="/aboutus" component={Auth(AboutUs, null)} />
            <Route
              exact
              path="/document/create"
              component={Auth(CreatePage, true)}
            />
            {/*<Route exact path="/document/edit" component={EditPage} />
            <Route exact path="/blog/edit/:postId" component={Auth(EditPage, null)} />*/}
            <Route
              exact
              path="/document/projectfolder"
              component={Auth(ProjectFolder, null)}
            />
            <Route
              exact
              path="/document/compare"
              component={Auth(CompareDoc, null)}
            />
            <Route
              exact
              path="/document/filemanager"
              component={Auth(FileManager, null)}
            />
            <Route
              exact
              path="/document/filemanager/:folderId"
              component={Auth(FileManager, null)}
            />
            <Route
              exact
              path="/project/viewproject/:id"
              component={Auth(ProjectPublic, null)}
            />
            <Route
              exact
              path="/project/createproject"
              component={Auth(CreateProject, null)}
            />
            <Route
              exact
              path="/project/MyProject/:id"
              component={Auth(ProjectPrivate, null)}
            />
            <Route
              exact
              path="/document/projectfolder"
              component={Auth(ProjectFolder, null)}
            />
            <Route
              exact
              path="/document/edit/:postId"
              component={Auth(EditPage, null)}
            />
            <Route
              exact
              path="/document/editorblog"
              component={Auth(EditorBlog, null)}
            />
            <Route
              exact
              path="/screenshare/share"
              component={Auth(ScreenShare, null)}
            />
            <Route
              exact
              path="/screenshare/receive"
              component={Auth(Receive, null)}
            />
            <Route
              exact
              path="/screenshare/send"
              component={Auth(Send, null)}
            />

            <Route exact path="/project" component={Auth(Project, null)} />
            <Route exact path="/forum" component={Auth(Forum, true)} />
            <Route
              exact
              path="/userProfile"
              component={Auth(UserProfile, null)}
            />
            {/* <Route exact path="/modal" component={Modal} /> */}
            <Route
              exact
              path="/project/settings/:id"
              component={Auth(ProjectSettings, null)}
            />

            <Route exact path="/whiteboard" component={Demo} />
          </Switch>
        </div>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
