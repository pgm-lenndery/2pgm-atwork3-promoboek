import React from 'react';
import styles from './FormButton.module.scss';
import { ChevronRight, Circle } from 'react-feather';

export default ({ title = 'no title set', loading = false }) => {   
    return (
        <button className={ `${styles.button} ${loading ? styles.loading : ''}` } type="submit" disabled={ loading }>
            <span className={ styles.label }>{ title } <ChevronRight /></span>
            <span className={ styles.indicator }>{ <Circle/> }</span>
        </button>
    )
}