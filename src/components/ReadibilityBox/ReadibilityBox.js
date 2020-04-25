import React, {useContext} from "react";
import { StateContext } from "../../state/StateProvider";
function ReadibilityBox(props) {
  const { editorState } = useContext(StateContext);
  let charCount = 0;
  let wordCount = 0;
  let sentenceCount = 0;
  let paragraphCount = 0;
  editorState.forEach((section) => {
    section.children.forEach((child) => {
      charCount = charCount + child.text.length;
      wordCount = wordCount + ((child.text.match(/[\w-]+/g) == null) ? 0 : child.text.match(/[\w-]+/g).length);
      if(section.type === "paragraph"){
        sentenceCount = sentenceCount + ((child.text.match(/[\w|)][.?!:](\s|$)/g) == null) ? 0 : child.text.match(/[\w|)][.?!:](\s|$)/g).length);
      }
    })
    if(section.type === "paragraph" && !section.children.every(child => child.text.length === 0 )){
      paragraphCount += 1;
    }
  }) 
  
  return (
    <div className="attributeBox">
      <h4>{props.header}</h4>
      <h1> Grade {props.score}</h1>
      <p>Reading time: {props.readingTime}</p>
      <p>Characters: {charCount}</p>
      <p>Words: {wordCount}</p>
      <p>Sentences: {sentenceCount}</p>
      <p>Paragraphs: {paragraphCount}</p>
    </div>
  );
}

export default ReadibilityBox;
