import React from 'react'
import {Paper, Grid} from '@material-ui/core'
import DocumentListStyles from './DocumentListStyles'
import { useSelector } from 'react-redux';
import DocSearch from '../../components/DocSearch/DocSearch'
import DocCard from '../../components/DocCard/DocCard'

const DocumentsList = () => {
    const classes = DocumentListStyles();
    const documentList = useSelector(state => state.documentListState.docs)
    
    return (
        <div>
            <DocSearch />
            <div>
                <DocCard />
                <DocCard />
                <DocCard />
                <DocCard />
                <DocCard />
            </div>
        </div>
    )
}

export default DocumentsList
