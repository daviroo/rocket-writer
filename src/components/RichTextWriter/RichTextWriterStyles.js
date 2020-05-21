import { makeStyles } from "@material-ui/core/styles";

const RichTextWriterStyles = makeStyles(theme => ({
    toolbar: {
        position: "relative",
        borderBottom: "2px solid rgb(238, 238, 238)"
    },
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
    
}));

  export default RichTextWriterStyles;