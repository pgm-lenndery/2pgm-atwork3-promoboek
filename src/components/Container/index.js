import React from 'react';
import styles from './Container.module.scss';

export default ({ children, className = '', onMouseOver = null, fluid, theme = 'default', ignorePadding, ...otherProps }) => {
    return (
        <div 
            onMouseOver={(e) => {if (onMouseOver) onMouseOver(e)}} 
            className={`container--${theme} ${className} container${fluid ? '-fluid' : ''} ${ ignorePadding && styles.ignorePadding }`} 
            {...otherProps}
        >
            { children }
        </div>
    )
}