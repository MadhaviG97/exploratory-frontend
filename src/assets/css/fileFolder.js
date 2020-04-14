import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      //backgroundColor: theme.palette.background.paper,
      //marginTop: theme.spacing(7),
      marginBottom: theme.spacing(15),
    },
    gridList: {
      width: '80%',
      height: '90%',
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }));