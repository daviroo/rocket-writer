import { makeStyles } from "@material-ui/core/styles";

const ToolbarStyles = makeStyles(theme => ({
    autoCompleteBox: {
      padding: theme.spacing(2),
    },

    activeButton: {
      border: "solid 1px #807FFF",
      backgroundColor: "#807FFF",
      color: "#ffffff",
      padding: 0,
      marginBottom: "5px",
      marginTop: "5px",
      boxShadow: "0px 2px 2px rgb(180, 178, 197, .9)"
    },

    inactiveButton: {
      border: "solid 1px #B4B2C5",
      color: "#B4B2C5",
      padding: 0,
      marginBottom: "5px",
      marginTop: "5px",
      boxShadow: "0px 1px 2px rgb(180, 178, 197, .6)"
    }
  }));

  export default ToolbarStyles;