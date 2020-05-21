import React from "react";
import KeywordBox from "../KeywordBox/KeywordBox";
// import SEOBoxStyles from './SEOBoxStyles';

function SEOBox(props) {
  // placeholder
  // const classes = SEOBoxStyles();
  return (
    <div className="flex-col mt-40 mb-40 p-30 metric-card">
      <div className="metric-card-header">
      <h4 className="metric-card-lable">{props.header}</h4>
      </div>
      <h1> Grade: {props.score}</h1>
      <div>Keyword at beginning: {props.kwBeginning}</div>
      <div>Keyword in Content: {props.kwContent}</div>
      <div>Content Length: {props.words} words, consider at least 600 words</div>
      <div>Keyword in headings: {props.kwHeadings}</div>
      <div>Keyword Density: {props.kwDensity}</div>
      <div>Outbound Links: {props.obLinks}</div>
      <div>Inbound Links: {props.ibLinks}</div>
      <KeywordBox />
    </div>
  );
}

export default SEOBox;
