import { makeStyles } from "@material-ui/core/styles";

const RichTextWriterStyles = makeStyles(theme => ({
    toolbar: {
        position: "relative",
        marginBottom: "20px",
        borderBottom: "2px solid rgb(238, 238, 238)"
    },
    root: {
        padding: "20px"
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
    }
}));

  export default RichTextWriterStyles;