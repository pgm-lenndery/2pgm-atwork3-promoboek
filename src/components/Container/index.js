import React from 'react';

export default ({ children, className = '', onMouseOver = null, fluid, theme = 'default', ...otherProps }) => {
    return (
        <div 
            onMouseOver={(e) => {if (onMouseOver) onMouseOver(e)}} 
            className={`container--${theme} ${className} container${fluid ? '-fluid' : ''}`} 
            {...otherProps}
        >
            { children }
        </div>
    )
}