import React from 'react';
import styles from './BoxCard.module.scss';

export default ({ children }) => {
    return (
        <div className={ styles.card }>
            { children }
        </div>
    )
}