import React, { useEffect } from "react";
import { render } from "../_actions/project_actions";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

export default function (ComposedClass, reload) {
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    let { id } = useParams();

    dispatch(render(id))
      .then(async (response) => {
        return <ComposedClass project={response.payload.project_details} />;
      })
      .catch((err) => {
        history.push("/");
      });
  }
  return AuthenticationCheck;
}
