import React from 'react'
import {Paper, Grid} from '@material-ui/core'
import DocumentListStyles from './DocumentListStyles'
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { loadDocument } from '../../state/actions/EditorActions';

const DocumentsList = () => {
    const classes = DocumentListStyles();
    const documentList = useSelector(state => state.documentListState.docs)
    const dispatch = useDispatch()
    if(documentList.length < 1)
        return <></>
    return (
        <Grid item xs={2}>
        <Paper className={classes.paper}>
            <h3>Docs</h3>
            {documentList.map(doc => <div style={{padding: "10px"}} onClick={() => dispatch(loadDocument(doc.id))}>
                <span style={{display: "block"}}>{doc.title}</span>
                <span style={{display: "block", fontSize: "9px", color: "grey"}}>{moment.unix(doc.lastUpdated.seconds).format("dddd, MMMM Do YYYY, h:mm:ss a")}</span>
                </div>)}
          </Paper>
          </Grid>
    )
}

export default DocumentsList
