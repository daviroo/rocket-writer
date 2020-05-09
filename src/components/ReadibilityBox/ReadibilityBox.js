import React from "react";
import {useSelector} from 'react-redux';

function ReadibilityBox(props) {
  const stats = useSelector(state => state.readibilityState.stats)
  
  return (
    <div className="attributeBox">
      <h4>{props.header}</h4>
      <h1> Grade {props.score}</h1>
      <p>Reading time: {props.readingTime}</p>
      <p>Characters: {stats.charCount}</p>
      <p>Words: {stats.wordCount}</p>
      <p>Sentences: {stats.sentenceCount}</p>
      <p>Paragraphs: {stats.paragraphCount}</p>
    </div>
  );
}

export default ReadibilityBox;
