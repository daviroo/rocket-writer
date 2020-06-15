import React from 'react'

const PassiveVoice = ({count}) => {  
    return (
        <div className="notification-card">
            <span className="notification-count">{count}</span>
            <span className="notification-description">Sentences have more than 2 occurences of passive voice</span>
        </div>
    )
}

export default PassiveVoice