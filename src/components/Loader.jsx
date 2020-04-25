//using npm or yarn
import React from "react";
import { Circle, Heart } from "react-spinners-css";
import Grid from "@material-ui/core/Grid";
export default function Loader() {
  return (
    <div>
      <Grid justifyContent="center" container>
        <Grid item>
          <Circle color="#be97e8" size={200} />
        </Grid>
        <Grid item>
          <Circle color="#be97e8" size={200} />
        </Grid>
        <Grid item>
          <Circle color="#be97e8" size={200} />
        </Grid>
      </Grid>
    </div>
  );
}
