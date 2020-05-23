import React from 'react'
import { useSelector } from 'react-redux';
import DocCard from '../../components/DocCard/DocCard'

const DocumentsList = () => {
    const documentList = useSelector(state => state.documentListState.docs)
    return (
        <div className="doc-list-map">
            {documentList.sort((doc1, doc2) => 
            doc1.lastUpdated.seconds < doc2.lastUpdated.seconds ? 1 : -1)
            .map(doc => <DocCard doc={doc} />)}
        </div>
    )
}

export default DocumentsList
