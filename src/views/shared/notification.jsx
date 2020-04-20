import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import { deepOrange500 } from "material-ui/styles/colors";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import FlatButton from "material-ui/FlatButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";

import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import ReactMaterialUiNotifications from "./ReactMaterialUiNotifications";
import moment from "moment";
import { Redirect, useHistory, useLocation } from "react-router-dom";

export default function Notification(props) {
  const [state, setState] = React.useState({
    count: 0,
    data: {
      id: 0,
      _read: false,
      researcher_id: "",
      direct_to: "",
      type: 0,
      icon: "",
      image: "",
      link: "",
      title: "",
      description: "",
    },
  });

  const styles = {
      buttonContainer: {
        display: "flex",
        justifyContent: "space-around",
      },
    },
    muiTheme = getMuiTheme({
      palette: {
        accent1Color: deepOrange500,
      },
    });

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/project" } };

  const handleSubmit = async (e, cb) => {
    e.preventDefault();
    cb();
  };

  const showPriorityNotification = () => {
    setState({ ...state, count: ++state.count });
    ReactMaterialUiNotifications.showNotification({
      title: "Title",
      additionalText: `Some message to be displayed ${state.count}`,
      iconBadgeColor: "#014f82",
      icon: <NotificationsActiveIcon />,
      overflowContent: (
        <div>
          <FlatButton
            label="mark as read"
            icon={<DoneOutlineIcon color="primary" />}
          />
          <FlatButton
            label="direct me"
            icon={<ExitToAppIcon color="primary" />}
            onClick={(e) =>
              handleSubmit(e, () => {
                history.replace(from);
              })
            }
          />
        </div>
      ),
      timestamp: moment().format("h:mm A"),
      personalised: true,
      avatar: "images/notification/bell.png",
      priority: true,
      zDepth: 4,
    });
  };

  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div style={styles.container}>
        <div style={styles.buttonContainer}>
          <RaisedButton
            label="Show Priority Notification"
            secondary={true}
            onClick={showPriorityNotification}
          />
        </div>

        <ReactMaterialUiNotifications
          desktop={true}
          transitionName={{
            leave: "dummy",
            leaveActive: "fadeOut",
            appear: "dummy",
            appearActive: "zoomInUp",
          }}
          transitionAppear={true}
          transitionLeave={true}
        />
      </div>
    </MuiThemeProvider>
  );
}

// export class Main2 extends Component {
//   state = {
//     count: 0,
//     data: {
//       id: 0,
//       _read: false,
//       researcher_id: "",
//       direct_to: "",
//       type: 0,
//       icon: "",
//       image: "",
//       link: "",
//       title: "",
//       description: "",
//     },
//     submit: false,
//   };

//   Redirect = (submit) => {
//     if (submit) {
//       return <Redirect to="/project" />;
//     }
//   };

//   handleSubmit = async (e, cb) => {
//     e.preventDefault();
//     cb();
//   };

//   showPriorityNotification = () => {
//     this.setState({
//       count: ++this.state.count,
//     });
//     ReactMaterialUiNotifications.showNotification({
//       title: "Title",
//       additionalText: `Some message to be displayed ${this.state.count}`,
//       iconBadgeColor: "#014f82",
//       icon: <NotificationsActiveIcon />,
//       overflowContent: (
//         <div>
//           <FlatButton
//             label="mark as read"
//             icon={<DoneOutlineIcon color="primary" />}
//             onClick={(e) =>
//               this.handleSubmit(e, () => {
//                 history.replace(from);
//               })
//             }
//           />
//           <FlatButton
//             label="direct me"
//             icon={<ExitToAppIcon color="primary" />}
//           />
//         </div>
//       ),
//       timestamp: moment().format("h:mm A"),
//       personalised: true,
//       avatar: "images/notification/bell.png",
//       priority: true,
//       zDepth: 4,
//     });
//   };

//   render() {
//     return (
//       <MuiThemeProvider muiTheme={muiTheme}>
//         <div style={styles.container}>
//           <div style={styles.buttonContainer}>
//             <RaisedButton
//               label="Show Priority Notification"
//               secondary={true}
//               onClick={this.showPriorityNotification}
//             />
//           </div>

//           <ReactMaterialUiNotifications
//             desktop={true}
//             transitionName={{
//               leave: "dummy",
//               leaveActive: "fadeOut",
//               appear: "dummy",
//               appearActive: "zoomInUp",
//             }}
//             transitionAppear={true}
//             transitionLeave={true}
//           />
//         </div>
//       </MuiThemeProvider>
//     );
//   }
// }

// // 1. new chat Message - person
// // 2. new whiteboard share request - person
// // 3. new screen share Message - person
// // 4. you have been added to this project - project
// // 5. you have been assigned to a new task
// // 6. someone added a new comment on your project
// // 7. someone has commented on your task

// // title - picture
// // title - icon
// // title - type
// //     1. chat message

// //     2. task Comment
// //     3. project Comment

// //     4. whiteboard req

// //     5. screen share req

// //     6. assigned to project

// //     7. assigned to task
// // description
// // link to the project
// // mark as read
// // time
// // close icon

// <Box p={3} bgcolor="background.paper">
//   <IconButton
//     aria-label="cart"
//     onClick={() => props.showNotification()}
//   >
//     <Badge badgeContent={4} color="secondary">
//       <NotificationsIcon />
//     </Badge>
//   </IconButton>
// </Box>
