import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFirebaseStorage } from '../../firebase';
import Anker from '../Anker';
import PurpleRain from '../PurpleRain';
import styles from './StudentCard.module.scss';

export default ({ studentData, theme = 'default', className = '' }) => {
    const { getDownloadURL, state: { data: avatarUrl } } = useFirebaseStorage();
    
    useEffect(() => {
        getDownloadURL(studentData.avatar);
    }, [])
    
    return (
        <Link to={ `/studenten/${ studentData.id }` }>  
            <div className={ `${ styles.card } ${ styles[theme] } ${ className }` }>
                <div className={ styles.card__body }> 
                    <p>{ studentData.firstName }<br /><span className="label small">{ studentData.lastName }</span></p>
                </div>
                <PurpleRain className={ styles.card__featureImg}>
                    <img src={ avatarUrl } alt=""/>
                </PurpleRain>
            </div>
        </Link>
    )
}