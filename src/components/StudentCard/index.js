import React, { useEffect } from 'react';
import { useFirebaseStorage } from '../../firebase';
import PurpleRain from '../PurpleRain';
import styles from './StudentCard.module.scss';

export default ({ firstName, lastName, avatar }) => {
    const { getDownloadURL, state: { data: avatarUrl } } = useFirebaseStorage();
    
    useEffect(() => {
        getDownloadURL(avatar);
    }, [])
    
    return (
        <div className={ styles.card }>
            <div className={ styles.card__body }> 
                <p>{ firstName }</p>
                <p>{ lastName }</p>
            </div>
            <PurpleRain className={ styles.card__featureImg}>
                <img src={ avatarUrl } alt=""/>
            </PurpleRain>
        </div>
    )
}