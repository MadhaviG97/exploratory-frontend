import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Tabs, Tab, Paper, Typography, Box, Grid } from "@material-ui/core";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      style={{ minHeight: "68vh" }}
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Grid container>
          <Grid item lg={1}></Grid>
          <Grid item lg={10}>
            <Box height="100%" alignItems="flex-start" py={3}>
              {children}
            </Box>
          </Grid>
          <Grid item lg={1}></Grid>
        </Grid>
      )}
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
    backgroundColor: "#eceff1",
    square: false,
    padding: theme.spacing(0, 10),
  },
  tab: {},
}));

export default function FullWidthTabs(props) {
  const { OverView, Team, Comments, Files } = props;
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
      <Paper square elevation={3}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          scrollButtons="auto"
          aria-label="full width tabs example"
        >
          <Tab className={classes.tab} label="Overview" {...a11yProps(0)} />
          <Tab className={classes.tab} label="Team" {...a11yProps(1)} />
          <Tab className={classes.tab} label="Comments" {...a11yProps(2)} />
          <Tab className={classes.tab} label="Files" {...a11yProps(3)} />
        </Tabs>
      </Paper>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel
          value={value}
          index={0}
          dir={theme.direction}
          children={OverView()}
        />
        <TabPanel
          value={value}
          index={1}
          dir={theme.direction}
          children={Team()}
        />

        <TabPanel
          value={value}
          index={2}
          dir={theme.direction}
          children={Comments()}
        />

        <TabPanel
          value={value}
          index={3}
          dir={theme.direction}
          children={Files()}
        />
      </SwipeableViews>
    </div>
  );
}
