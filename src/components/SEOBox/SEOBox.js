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
      <KeywordBox />
      <ul>
      <li>Keyword at beginning: {props.kwBeginning}</li>
      <li>Keyword in Content: {props.kwContent}</li>
      <li>Content Length: {props.words} words</li>
      <li>Keyword in headings: {props.kwHeadings}</li>
      <li>Keyword Density: {props.kwDensity}</li>
      <li>Outbound Links: {props.obLinks}</li>
      <li>Inbound Links: {props.ibLinks}</li>
      </ul>
      
    </div>
  );
}

export default SEOBox;
