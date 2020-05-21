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
            {documentList.map(doc => <DocCard doc={doc} />)}
            </div>
        </div>
    )
}

export default DocumentsList
