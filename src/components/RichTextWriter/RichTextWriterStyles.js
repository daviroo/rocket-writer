import { makeStyles } from "@material-ui/core/styles";

const RichTextWriterStyles = makeStyles(theme => ({
    root: {
        fontFamily: "itc-american-typewriter, serif",
        fontWeight: "500",
        fontStyle: "normal",
        fontSize: "20px",
        color: "#7A788D",
        lineHeight: "1.8"
    },
    activeButton: {
        backgroundColor: "grey"
    },
    inactiveButton: {
        backgroundColor: "white"
    },
    saveButton: {
        position: "relative",
        zIndex: "99",
        float: "right"
    },
    titleInput: {
        paddingLeft: "20px",
        paddingRight: "20px",
        '&::after': {
          paddingLeft: "20px",
        paddingRight: "20px",
        },
        '&::before': {
          paddingLeft: "20px",
        paddingRight: "20px",
        }
      },
      spinner: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100%"
      }
    
}));

  export default RichTextWriterStyles;