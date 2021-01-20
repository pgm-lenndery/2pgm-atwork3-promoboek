import React, { useEffect } from 'react';
import { useFirebaseStorage } from '../../firebase';
import PurpleRain from '../PurpleRain';
import styles from './StudentCard.module.scss';

export default ({ firstName, lastName, avatar, theme = 'default' }) => {
    const { getDownloadURL, state: { data: avatarUrl } } = useFirebaseStorage();
    
    useEffect(() => {
        getDownloadURL(avatar);
    }, [])
    
    return (
        <div className={ `${ styles.card } ${ styles[theme] }` }>
            <div className={ styles.card__body }> 
                <p>{ firstName }<br /><span className="label small">{ lastName }</span></p>
            </div>
            <PurpleRain className={ styles.card__featureImg}>
                <img src={ avatarUrl } alt=""/>
            </PurpleRain>
        </div>
    )
}