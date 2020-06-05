import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import signUp from "./views/guest-user/sign-up.jsx";
import ConfirmEmail from "./views/guest-user/ConfirmEmail.jsx";
import TemporaryRegister from "./views/guest-user/TemporaryRegister.jsx";

import fillProfile from "./views/researcher/fill-profile";
import UserProfile from "./views/researcher/user-profile";
import AboutUs from "./views/shared/about-us.jsx";
import Forum from "./views/shared/public-forum";
import ForumSearch from "./views/shared/public-forum-search";
import signIn from "./views/researcher/sign-in";

import Feed from "./views/researcher/feed";
import Search from "./views/home/search";
import Chat from "./views/researcher/chat";

//hoc
import Auth from "./hoc/auth";
import ValidateProject from "./hoc/validateProject";
import ValidUser from "./hoc/validUser";
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

//project
import ProjectPublic from "./views/research/index/ViewResearchPublic";
import CreateProject from "./views/research/index/CreateResearch";
import CompareDoc from "./views/research/fileFolder/CompareDoc";
import ProjectSettings from "./views/research/index/ProjectSettings";
import Receive from "./views/research/screenShare/Receive";
import Send from "./views/research/screenShare/Send";

import JoinRoom from "./views/whiteboard/JoinRoom";

import TaskTracker from "./components/Project/TaskTracker";

import NotFound from "./components/NotFound/NotFound";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThemeProvider theme={Theme}>
        <Navbar />
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

            <Route
              exact
              path="/user/join-exploratory/:userId"
              component={Auth(ConfirmEmail, false)}
            />

            <Route
              exact
              path="/user/temporary-register/:userId"
              component={Auth(TemporaryRegister, null)}
            />

            <Route exact path="/aboutus" component={Auth(AboutUs, null)} />
            <Route
              exact
              path="/document/:projectId/create"
              component={Auth(CreatePage, true)}
            />
            <Route
              exact
              path="/document/:projectId/compare"
              component={Auth(CompareDoc, true)}
            />
            <Route
              exact
              path="/document/:projectId/view/:postId"
              component={Auth(ViewDocument, true)}
            />
            <Route
              exact
              path="/document/:projectId/filemanager"
              component={Auth(FileManager, true)}
            />
            <Route
              exact
              path="/document/:projectId/filemanager/:folderId"
              component={Auth(FileManager, true)}
            />
            <Route
              exact
              path="/project/viewproject/:id"
              component={Auth(ProjectPublic, true)}
            />
            <Route
              exact
              path="/project/createproject"
              component={Auth(CreateProject, true)}
            />

            <Route
              exact
              path="/document/:projectId/edit/:postId"
              component={Auth(EditPage, true)}
            />
            <Route
              exact
              path="/document/:projectId/editorblog"
              component={Auth(EditorBlog, true)}
            />
            <Route
              exact
              path="/screenshare/:projectId/receive"
              component={Auth(Receive, true)}
            />
            <Route
              exact
              path="/screenshare/:projectId/send"
              component={Auth(Send, true)}
            />

            <Route exact path="/forum" component={Auth(Forum, true)} />
            <Route
              exact
              path="/userprofile/:uId"
              component={Auth(UserProfile, null)}
            />
            <Route
              exact
              path="/project/settings/:id"
              component={Auth(ProjectSettings, true)}
            />

            <Route
              exact
              path="/project/whiteboard/join-room/:project_id"
              component={Auth(JoinRoom, true)}
            />

            <Route exact path="/chat" component={Auth(Chat, null)} />

            <Route
              exact
              path="/project/tasktracker/:pId"
              component={Auth(TaskTracker, true)}
            />

            <Route
              exact
              path="/404-not-found"
              component={Auth(NotFound, null)}
              path="/forum/search/:string"
              component={Auth(ForumSearch, true)}
            />
          </Switch>
        </div>
        <Footer />
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
