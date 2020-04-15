import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Tabs, Paper } from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import OverView from "./overview";
import Team from "./team";
import ChatHead from "./chathead";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    square: false,
    padding: theme.spacing(0, 23),
  },
  tab: {
    height: "100vh",
    padding: theme.spacing(0),
    backgroundColor: "#cfe8fc",
  },
  overview: {
    padding: theme.spacing(2, 0),
  },
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <Paper square>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab wrapped="true" label="OverView" {...a11yProps(0)} />
          <Tab label="Team" {...a11yProps(1)} />
          <Tab label="Comments" {...a11yProps(2)} />
        </Tabs>
      </Paper>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Box>
            <Box className={classes.overview}>
              <OverView heading1="Goal" heading2="Goal" heading3="Hypothesis" />
            </Box>
            <Box className={classes.overview}>
              <OverView
                heading1="Final paper"
                heading2="Add final paper"
                heading3="Add document"
              />
            </Box>
            <Box className={classes.overview}>
              <OverView
                heading1="Experiment findings"
                heading2="Experiment"
                heading3="Results"
              />
            </Box>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Team />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <ChatHead />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
