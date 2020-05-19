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
import Chat from "./views/researcher/chat";

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
import ViewDocument from "./views/research/editor/ViewDocument";
import FileManager from "./views/research/fileFolder/FileManager";
import ProjectFolder from "./views/research/fileFolder/ProjectFolder";

//project
import ProjectPublic from "./views/research/index/ViewResearchPublic";
import ProjectPrivate from "./views/research/index/ViewResearchPrivate";
import CreateProject from "./views/research/index/CreateResearch";
import CompareDoc from "./views/research/fileFolder/CompareDoc";
import ProjectSettings from "./views/research/index/ProjectSettings";
import Project from "./views/research/index/ViewResearchPublic";
import Receive from "./views/research/screenShare/Receive"
import Send from "./views/research/screenShare/Send"

import Demo from "./views/whiteboard/Demo";
import TaskTracker from "./components/Project/task_tracker";

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
              component={Auth(CompareDoc, true)}
            />
            <Route
              exact
              path="/document/view/:postId"
              component={Auth(ViewDocument, true)}
            />
            <Route
              exact
              path="/document/filemanager"
              component={Auth(FileManager, true)}
            />
            <Route
              exact
              path="/document/filemanager/:folderId"
              component={Auth(FileManager, true)}
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
              component={Auth(ProjectFolder, true)}
            />
            <Route
              exact
              path="/document/edit/:postId"
              component={Auth(EditPage, true)}
            />
            <Route
              exact
              path="/document/editorblog"
              component={Auth(EditorBlog, true)}
            />
            <Route
              exact
              path="/screenshare/receive"
              component={Auth(Receive, true)}
            />
            <Route
              exact
              path="/screenshare/send"
              component={Auth(Send, true)}
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
<<<<<<< HEAD
=======

            <Route exact path="/whiteboard" component={Demo} />

>>>>>>> 452135c94c1091467d806efec33ff936e9b3a0aa

            <Route
              exact
              path="/chat"
              component={Auth(Chat, null)}
            />

            <Route exact path="/tasktracker" component={Auth(TaskTracker, true)} />
<<<<<<< HEAD
=======

>>>>>>> 452135c94c1091467d806efec33ff936e9b3a0aa
          </Switch>
        </div>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;

