import React from 'react';

export default ({ children, onMouseOver = null, fluid, theme = 'default', ...otherProps }) => {
    return (
        <div onMouseOver={(e) => {if (onMouseOver) onMouseOver(e)}} className={`container--${theme} container${fluid ? '-fluid' : ''}`} {...otherProps}>{ children }</div>
    )
}