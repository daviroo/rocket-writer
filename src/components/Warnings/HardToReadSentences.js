import React from 'react'
import { useDispatch } from 'react-redux'
import { updateSelectedWarningSentence } from '../../state/actions/EditorActions';
import { useState } from 'react';

const HardToReadSentences = ({count, sentences}) => { 
    const dispatch = useDispatch(); 
    const [selectedIndex, setSelectedIndex] = useState(0);

    const incrementSelectedIndex = () => {
        if((selectedIndex + 1) === sentences.length){
            setSelectedIndex(0)
            return;
        }
        setSelectedIndex(selectedIndex + 1)
    }



    return (
        <div className="notification-card" onClick={() => {
            
            dispatch(updateSelectedWarningSentence(sentences[selectedIndex].sentence))
            incrementSelectedIndex();
            }}>
            <span className="notification-count">{count}</span>
            <span className="notification-description">Sentences are hard to read</span>
        </div>
    )
}

export default HardToReadSentences