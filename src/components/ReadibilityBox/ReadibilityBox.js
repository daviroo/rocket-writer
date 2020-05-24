import React from "react";
import {useSelector} from 'react-redux';

function ReadibilityBox(props) {
  const stats = useSelector(state => state.readibilityState.stats)
  
  return (
    <div className="flex-col mb-40 p-30 metric-card">
      <div className="metric-card-header">
      <h4 className="metric-card-lable">{props.header}</h4>
      </div>
      <h1> Grade {props.score}</h1>
      <ul>
      <li>Reading time: {props.readingTime}</li>
      <li>Characters: {stats.charCount}</li>
      <li>Words: {stats.wordCount}</li>
      <li>Sentences: {stats.sentenceCount}</li>
      <li>Paragraphs: {stats.paragraphCount}</li>
      </ul>
    </div>
  );
}

export default ReadibilityBox;
