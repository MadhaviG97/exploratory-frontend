import { createMuiTheme } from "@material-ui/core/styles";
import theme from "./Theme";
//This is to stop auto capitalizing tab and button text
const Theme = createMuiTheme({
  typography: {
    button: {
      textTransform: "none",
    },
    tab: {
      textTransform: "none",
      disableRipple: true,
    },
  },
  palette: {
    primary: {
      main: "#014f82",
    },
    // secondary: {
    //   main: "#f48fb1",
    // },
  },
});

export default Theme;
