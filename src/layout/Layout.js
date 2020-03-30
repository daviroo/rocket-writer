import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import WriteText from "../components/WriteText";
import ReadibilityBox from "../components/ReadibilityBox";
import SEOBox from "../components/SEOBox";

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "left",
      color: theme.palette.text.secondary
    }
  }));

export default function Layout() {
    const classes = useStyles();

    return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>WRITERshake</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <h3>Current Docs</h3>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            <WriteText />
          </Paper>
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
