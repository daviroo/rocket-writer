import React from 'react'
import cross from './cross.svg';
import moveHandle from './moveHandle.svg';
import { useDispatch } from 'react-redux';
import { loadDocument } from '../../state/actions/EditorActions';
const DocCard = ({doc}) => {  
    const dispatch = useDispatch()
    return (
        <div className="doc-card flex-col">
            <div className="doc-delete">
                <img src={cross} alt="Delete Document Icon" />
            </div>
            <div onClick={() => dispatch(loadDocument(doc.id))}>
            <h3>{doc.title}</h3>
            <div className="doc-card-wrapper">
                <div className="doc-card-wrapper">
                    <div className="doc-card-attribute-content">
                        <div className="doc-card-attribute-title">Grade</div>
                        <div className="doc-card-attribute-score">4</div>
                    </div>
                    <div className="doc-card-attribute-content">
                        <div className="doc-card-attribute-title">SEO</div>
                        <div className="doc-card-attribute-score">Good</div>
                    </div>
                </div>
                <div className="doc-move-icon">
                    <img src={moveHandle} alt="Move Document Icon" />
                </div>
            </div>
            </div>
        </div>
    )
}

export default DocCard