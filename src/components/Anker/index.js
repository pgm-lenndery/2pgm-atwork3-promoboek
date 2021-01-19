import React from 'react';
import styles from './Anker.module.scss';
import { ChevronRight } from 'react-feather';
import { Link } from 'react-router-dom';

export default ({ title = 'no title set', href = '#', onClick = () => null, className = '' }) => {   
    return (
        <Link to={ href } onClick={onClick} className={ `${styles.button} ${className}` }>
            <span className={ styles.label }>{ title } <ChevronRight /></span>
        </Link>
    )
}