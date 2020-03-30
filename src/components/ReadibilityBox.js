import React, {useContext} from "react";
import { StateContext } from "../state/StateProvider";
function ReadibilityBox(props) {
  const { editorState } = useContext(StateContext);
  return (
    <div className="attributeBox">
      <h4>{props.header}</h4>
      <h1> Grade {props.score}</h1>
      <p>Reading time: {props.readingTime}</p>
      <p>Characters: {editorState.getCurrentContent().getPlainText().length}</p>
      <p>Words: {editorState.getCurrentContent().getPlainText().split(' ').length -1}</p>
      <p>Sentences: {editorState.getCurrentContent().getPlainText().match(/[\w|\)][.?!](\s|$)/g) == null ? "0": editorState.getCurrentContent().getPlainText().match(/[\w|\)][.?!](\s|$)/g).length}</p>
      <p>Paragraphs: {editorState.getCurrentContent().getPlainText().match(/\n/g) == null ? "0": editorState.getCurrentContent().getPlainText().match(/\n/g).length}</p>
    </div>
  );
}

export default ReadibilityBox;
