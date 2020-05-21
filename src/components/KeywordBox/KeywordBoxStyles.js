import { makeStyles } from "@material-ui/core/styles";

const KeywordBoxStyles = makeStyles(theme => ({
    autoCompleteBox: {
      padding: "0px",
      backgroundColor: "#ffffff",
      border: "solid 1px #B4B2C5",
      borderRadius: "4px",
      height: "40px",
      marginBottom: "15px"
    },

    textField: {
      color: "#B4B2C5",
      fontSize: "20px",
      fontWeight: "bold",
      margin: "0px",
      padding: "3px 20px 0px 20px",
      borderBottom: "none"

    }
  }));

  export default KeywordBoxStyles;