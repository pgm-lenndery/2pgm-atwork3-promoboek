import React from 'react';
import styles from './Button.module.scss';
import { ChevronRight, Circle } from 'react-feather';

export default ({ title = 'no title set', loading = false, onClick = () => null, className = '', theme = 'default' }) => {   
    return (
        <button onClick={onClick} className={ `${styles.button} ${loading ? styles.loading : ''} ${ className } ${ styles[theme] }` } type="submit">
            <span className={ styles.label }>{ title } <ChevronRight /></span>
            <span className={ styles.indicator }>{ <Circle/> }</span>
        </button>
    )
}