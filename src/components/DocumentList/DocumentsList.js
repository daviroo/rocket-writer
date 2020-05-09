import React from 'react'
import {Paper, Grid} from '@material-ui/core'
import DocumentListStyles from './DocumentListStyles'
import { useSelector } from 'react-redux';

const DocumentsList = () => {
    const classes = DocumentListStyles();
    const documentList = useSelector(state => state.documentListState.docs)
    if(documentList.length < 1)
        return <></>
    return (
        <Grid item xs={2}>
        <Paper className={classes.paper}>
            <h3>Docs</h3>
          </Paper>
          </Grid>
    )
}

export default DocumentsList
