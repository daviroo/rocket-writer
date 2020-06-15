import React from 'react'
import LayoutStyles from './LayoutStyles';
import RichTextWriter from '../components/RichTextWriter/RichTextWriter'
import ReadibilityBox from "../components/ReadibilityBox/ReadibilityBox";
import SEOBox from "../components/SEOBox/SEOBox";
import DocumentsList from '../components/DocumentList/DocumentsList'
import Header from '../components/Header/Header'
import rocketDivider from './rocketDivider.svg'
import DocSearch from '../components/DocSearch/DocSearch'
import Warnings from '../components/Warnings';

export default function Layout() {
    return (
      
      <div id="main-wrapper">
        <Header />
        <div className="doc-sidebar">
            <DocSearch />
            <DocumentsList />
          </div>

      <section id="main">
      <div className="rocket-divider"><img src={rocketDivider} alt="divider" /></div>

          <div className="text-editor-container">
            <div className="readibility-sidebar">
              <ReadibilityBox
                header="Readibility Score"
                score="6"
                readingTime="1:35"
                characters="1056"
                words="355"
                sentences="54"
                paragraphs="5"
              />
              <Warnings />
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
            <RichTextWriter />

          </div>

    </section>
    </div>
    )
}
