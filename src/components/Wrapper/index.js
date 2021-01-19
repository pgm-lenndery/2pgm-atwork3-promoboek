import React from 'react';
import styles from './Wrapper.module.scss';

export default ({ children }) => {
    return (
        <div className={ styles.wrapper }>
            { children }
        </div>
    )
}