import React, { useEffect } from "react";
import axios from "axios";
import { auth } from "../_actions/user_actions";
import { useSelector, useDispatch } from "react-redux";

export default function (ComposedClass, reload) {
  let user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function isCollaborator(collaborators, userId) {
    let isUser = false;

    collaborators.map((collaborator) => {
      if (collaborator.researcher_id === userId) {
        isUser = true;
      }
    });
    return isUser;
  }

  function AuthenticationCheck(props) {
    useEffect(() => {
      dispatch(auth()).then(async (response) => {
        if (await !response.payload) {
          if (reload) {
            props.history.push("/signup");
          }
        } else {
          if (reload === false) {
            props.history.push("/");
          } else {
            let id = props.match.params.id;
            axios
              .post("/project/get-collaborator-ids", { project_id: id })
              .then((result) => {
                console.log(response.payload);
                var user_id = response.payload._id;
                if (!isCollaborator(result.data, user_id)) {
                  props.history.push("/signin");
                }
              });
          }
        }
      });
    }, []);

    return <ComposedClass {...props} />;
  }
  return AuthenticationCheck;
}
