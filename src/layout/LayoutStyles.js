import { makeStyles } from "@material-ui/core/styles";

const LayoutStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "left",
      color: theme.palette.text.secondary
    },
    titleInput: {
      marginLeft: "20px"
    }
  }));

  export default LayoutStyles;