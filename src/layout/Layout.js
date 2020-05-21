import React from 'react'
import LayoutStyles from './LayoutStyles';
import {Paper, Grid} from "@material-ui/core"
import RichTextWriter from '../components/RichTextWriter/RichTextWriter'
import ReadibilityBox from "../components/ReadibilityBox/ReadibilityBox";
import SEOBox from "../components/SEOBox/SEOBox";
import DocumentsList from '../components/DocumentList/DocumentsList'
import Header from '../components/Header/Header'
import {useSelector} from 'react-redux';
import rocketDivider from './rocketDivider.svg'
import Adverbs from "../components/Notifications/Adverbs"

export default function Layout() {
    const classes = LayoutStyles();
    return (
      
      <div>
      <Header />
      <section id="main" className="mt-40">
      <div className="rocket-divider"><img src={rocketDivider} alt="divider" /></div>

          <div className="doc-sidebar p-20">
            <DocumentsList />
          </div>

          <div className="text-editor-container p-20">
            <RichTextWriter />
          </div>

          <div className="readibility-sidebar p-20">
            <ReadibilityBox
              header="Readibility Score"
              score="6"
              readingTime="1:35"
              characters="1056"
              words="355"
              sentences="54"
              paragraphs="5"
            />
            <Adverbs />
            <SEOBox
              header="SEO Score"
              score="Good"
              kwBeginning="Yes"
              kwContent="Yes"
              words="450"
              kwHeadings="No"
              kwDensity="1.4%"
              obLinks="2"
              ibLinks="6"
            />
          </div>


          

    </section>
    </div>
    )
}
