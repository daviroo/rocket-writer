import React from 'react'
import { useSelector } from 'react-redux';
import DocSearch from '../../components/DocSearch/DocSearch'
import DocCard from '../../components/DocCard/DocCard'

const DocumentsList = () => {
    const documentList = useSelector(state => state.documentListState.docs)
    return (
        <div>
            <DocSearch />
            <div>
            {documentList.sort((doc1, doc2) => doc1.lastUpdated.seconds < doc2.lastUpdated.seconds ? 1 : -1).map(doc => <DocCard doc={doc} />)}
            </div>
        </div>
    )
}

export default DocumentsList
