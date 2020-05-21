import React from 'react'
import LayoutStyles from './LayoutStyles';
import {Paper, Grid} from "@material-ui/core"
import RichTextWriter from '../components/RichTextWriter/RichTextWriter'
import ReadibilityBox from "../components/ReadibilityBox/ReadibilityBox";
import SEOBox from "../components/SEOBox/SEOBox";
import KeywordBox from "../components/KeywordBox/KeywordBox";
import DocumentsList from '../components/DocumentList/DocumentsList'
import Header from '../components/Header/Header'
import {useSelector} from 'react-redux';

export default function Layout() {
    const classes = LayoutStyles();
    const documentsList = useSelector(state => state.documentListState.docs);
    return (
    <div className={classes.root}>
  
      <Grid container>
      <Header />
          <DocumentsList />
        <Grid item xs={documentsList.length === 0 ? 10 : 8}>
          <KeywordBox />
          
            <RichTextWriter />
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <ReadibilityBox
              header="Readibility Score"
              score="6"
              readingTime="1:35"
              characters="1056"
              words="355"
              sentences="54"
              paragraphs="5"
            />
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
          </Paper>
        </Grid>
      </Grid>
    </div>
    )
}
