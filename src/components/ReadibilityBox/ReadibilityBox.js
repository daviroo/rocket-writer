import React, {useContext} from "react";
import { StateContext } from "../../state/StateProvider";
import CircularProgress from "@material-ui/core/CircularProgress";
// import ReadibilityBoxStyles from './ReadibilityBoxStyles';
function ReadibilityBox(props) {
  const { editorState } = useContext(StateContext);
  // placeholder
  // const classes = ReadibilityBoxStyles();


  if(!editorState){
    return <CircularProgress />
  }
const charCount = editorState.text.length;
const wordCount = editorState.nodes.filter(node => node.type === "paragraph" && node.text).reduce((t, i) => t+= i.text.split(' ').length, 0);
const sentenceCount = editorState.nodes.filter(node => node.type === "paragraph" && node.text).reduce((t, i) => t+= i.text.match(/[\w|)][.?!](\s|$)/g) == null ? 0 : i.text.match(/[\w|)][.?!](\s|$)/g).length, 0);
  
  
  return (
    <div className="attributeBox">
      <h4>{props.header}</h4>
      <h1> Grade {props.score}</h1>
      <p>Reading time: {props.readingTime}</p>
      <p>Characters: {charCount}</p>
      <p>Words: {wordCount}</p>
      <p>Sentences: {sentenceCount}</p>
      <p>Paragraphs: {editorState.nodes.filter(node => node.type === "paragraph" && node.text).count()}</p>
    </div>
  );
}

export default ReadibilityBox;
