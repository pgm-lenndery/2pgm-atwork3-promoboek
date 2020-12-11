import React from 'react';

export default ({ children, onMouseOver = null, fluid, theme = 'default' }) => {
    return (
        <div onMouseOver={(e) => {if (onMouseOver) onMouseOver(e)}} className={`container--${theme} container${fluid ? '-fluid' : ''}`}>{ children }</div>
    )
}