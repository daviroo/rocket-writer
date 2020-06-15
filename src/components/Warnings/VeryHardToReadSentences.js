import React from 'react'

const VeryHardToReadSentences = ({count}) => {  
    return (
        <div className="notification-card">
            <span className="notification-count">{count}</span>
            <span className="notification-description">Sentences are very hard to read</span>
        </div>
    )
}

export default VeryHardToReadSentences