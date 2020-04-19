import React, {useContext, useEffect} from 'react'
import LayoutStyles from './LayoutStyles';
import {Paper, Grid} from "@material-ui/core"
import WriteText from "../components/WriteText";
import ReadibilityBox from "../components/ReadibilityBox/ReadibilityBox";
import SEOBox from "../components/SEOBox/SEOBox";
import KeywordBox from "../components/KeywordBox/KeywordBox";
import DocumentsList from '../components/DocumentList/DocumentsList'
import { StateContext, DispatchContext } from "../state/StateProvider";
import Header from '../components/Header/Header'
import * as firebase from 'firebase/app';
import { userLoggedIn, userLoggedOut } from '../state/actions/UserActions'


export default function Layout() {
    const classes = LayoutStyles();
    const { documentListLength } = useContext(StateContext);
    const dispatch = useContext(DispatchContext);
    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              dispatch(userLoggedIn())
            } else {
                dispatch(userLoggedOut())
            }
          });
    }, [dispatch])
    return (
    <div className={classes.root}>
  
      <Grid container>
      <Header />
          <DocumentsList />
        <Grid item xs={documentListLength === 0 ? 10 : 8}>
          <KeywordBox />
            <WriteText />
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
