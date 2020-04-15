import React from "react";
import {
  Typography,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanel,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useStyles } from "../assets/css/overview";
import FeaturedPost from "./FeaturedPost";

export default function Overview(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <React.Fragment>
      <FeaturedPost
        heading1={props.heading1}
        heading2={props.heading2}
        heading3={props.heading3}
      />
    </React.Fragment>
  );
}
