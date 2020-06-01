import React from "react";
import axios from "axios";

export default function (ComposedClass) {
  function AuthenticationCheck(props) {
    let id = props.match.params.id;

    var response = axios
      .post("/project/is-exist-project", { project_id: id })
      .then((response) => {
        if (response.data === false) {
          let { from } = {
            from: { pathname: `/404-not-found` },
          };
          props.history.replace(from);
          return false;
        } else {
          return true;
        }
      });
    return <ComposedClass {...props} />;
  }
  return AuthenticationCheck;
}
