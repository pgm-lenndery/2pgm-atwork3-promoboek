import React from 'react';
import styles from './Section.module.scss';

export default ({ spacing = 'none', children }) => {
    return (
        <div className={ styles[spacing] }>
            { children }
        </div>
    )
}