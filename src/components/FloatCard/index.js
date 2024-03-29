import React, { useEffect } from 'react';
import Fade from 'react-reveal/Fade';
import { ArrowRight } from 'react-feather';
import { Link } from 'react-router-dom';

import PurpleRain from '../PurpleRain';
import './index.scss';
import { useFirebaseStorage, useFirestoreQuery } from '../../firebase';

export default ({ children: content, data }) => {
    const { getDownloadURL, state: { data: projectBannerUrl } } = useFirebaseStorage();
    
    useEffect(() => {
        if (data.banner) getDownloadURL(data.banner);
    }, [])
    
    return (
        <Fade bottom>
            <Link to={ `/projecten/${ data.id }` } className="floatCard">
                <div className="floatCard__head">
                <div>
                    <div className="label small">4 maanden geleden</div>
                    <p>web programming</p>
                </div>
                <ArrowRight/>
                </div>
                <div className="floatCard__body">
                    <div className="floatCard__body-overlay">
                        <h2>{ data.title }</h2>
                        <p>{ data.content }</p>
                    </div>
                    <PurpleRain>
                        <img src={
                            projectBannerUrl || "https://pgmgent-1920-students.github.io/case1-pgm-website-baas-pgm-lenndery/src/images/cases/tronald%20dump/thumb.png"
                        } alt=""/>
                    </PurpleRain>
                </div>
            </Link>
        </Fade>
    )
}