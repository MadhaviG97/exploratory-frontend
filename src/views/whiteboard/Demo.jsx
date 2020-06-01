import React from "react";
import TableList from "../../components/Whiteboard/TableList";
import { Button } from "@material-ui/core";
import Appbar from "../../components/Whiteboard/CustomAppBar";
import SelectUsers from "../../components/Whiteboard/AddUsers";

export default function Demo() {
  const [num, setNum] = React.useState("");

  const user = 1000;

  console.log(1000);
  return (
    <React.Fragment>
      <Appbar />
      <Button href={`http://localhost:3001/${user}`}>Generate {num}</Button>
      <div>{num}</div>
      <SelectUsers />
    </React.Fragment>
  );
}
