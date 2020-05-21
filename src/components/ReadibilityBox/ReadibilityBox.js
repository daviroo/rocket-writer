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
      <div>Reading time: {props.readingTime}</div>
      <div>Characters: {stats.charCount}</div>
      <div>Words: {stats.wordCount}</div>
      <div>Sentences: {stats.sentenceCount}</div>
      <div>Paragraphs: {stats.paragraphCount}</div>
    </div>
  );
}

export default ReadibilityBox;
