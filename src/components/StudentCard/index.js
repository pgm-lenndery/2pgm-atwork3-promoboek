import React from 'react';
import PurpleRain from '../PurpleRain';
import styles from './StudentCard.module.scss';

export default ({ firstName, lastName, avatar }) => {
    return (
        <div className="flex-grid__item">
            <div className={ styles.card }>
                <div className={ styles.card__body }> 
                    <p>{ firstName }</p>
                    <p>{ lastName }</p>
                </div>
                <PurpleRain className={ styles.card__featureImg}>
                    <img src={ avatar } alt=""/>
                </PurpleRain>
            </div>
        </div>
    )
}