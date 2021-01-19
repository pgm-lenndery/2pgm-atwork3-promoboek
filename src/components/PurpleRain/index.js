import React from 'react';

import './index.scss';

export default ({ children, className = '' }) => {
    return (
        <div className={`purpleRain ${ className }`}>{ children }</div>
    )
}