import React from "react";
// import SEOBoxStyles from './SEOBoxStyles';

function SEOBox(props) {
  // placeholder
  // const classes = SEOBoxStyles();
  return (
    <div className="attributeBox">
      <h4>{props.header}</h4>
      <h1> Grade: {props.score}</h1>
      <p>Keyword at beginning: {props.kwBeginning}</p>
      <p>Keyword in Content: {props.kwContent}</p>
      <p>Content Length: {props.words} words, consider at least 600 words</p>
      <p>Keyword in headings: {props.kwHeadings}</p>
      <p>Keyword Density: {props.kwDensity}</p>
      <p>Outbound Links: {props.obLinks}</p>
      <p>Inbound Links: {props.ibLinks}</p>
    </div>
  );
}

export default SEOBox;
