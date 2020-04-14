import { createMuiTheme } from "@material-ui/core/styles";
import { green, orange } from '@material-ui/core/colors';
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
    palette: {
      background: {
        default: "#ff0000"
      },
    }
  },
});

export default Theme;
