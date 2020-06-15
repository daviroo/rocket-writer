import React from 'react'

const Adverbs = ({count}) => {  
    return (
        <div className="notification-card">
            <span className="notification-count">{count}</span>
            <span className="notification-description">Sentences have more than 2 Adverbs</span>
        </div>
    )
}

export default Adverbs