import React, {useContext} from 'react'
import {Paper, Grid} from '@material-ui/core'
import { StateContext } from "../../state/StateProvider";
import DocumentListStyles from './DocumentListStyles'

const DocumentsList = () => {
    const classes = DocumentListStyles();
    const { documentList } = useContext(StateContext);
    if(documentList.isEmpty())
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
