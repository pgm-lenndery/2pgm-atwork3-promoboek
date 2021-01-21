import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs'

import { Loader, Modal, Anker, Wrapper, PurpleRain, Works } from '../../components';
import { useFirebaseStorage, useFirestoreQuery, useLazyFirestoreQuery, useAuth } from '../../firebase';

export default () => {
    const { user } = useAuth();
    const { id } = useParams();
    // const { data: projectsData } = useFirestoreQuery(fs => fs.collection('projects').where('creator', '==', id).limit(3))
    const { getDownloadURL, state: { data: avatarUrl } } = useFirebaseStorage();
    const { data: studentData }= useFirestoreQuery(fs => fs.doc(`users/${id}`))
    
    useEffect(() => {
        if (studentData) getDownloadURL(studentData.avatar);
    }, [studentData])
        
    if (!studentData) return <Loader />
    else return (
        <Modal ignorePadding>
            <div className="row">
                <div className="col-12 col-md-8 col-xl-9">
                    <Wrapper>
                        { user?.uid === studentData.id && <Anker className="mt-0 mb-5" title="Profiel bewerken" href="/account" />}
                        <h2>{ studentData.firstName } { studentData.lastName }</h2>
                        <div className="label mb-3">Over { studentData?.firstName }</div>
                        { studentData.periodStart &&
                            <>
                                <p className="small label">Traject</p>
                                <p>{ studentData.periodStart } { studentData.periodEnd }</p>
                            </>
                        }
                        {/* <Works data={ projectsData }/> */}
                    </Wrapper>
                </div>
                <div className="col-12 col-md-4 col-xl-3">
                    <PurpleRain>
                        <img src={ avatarUrl } alt="" width="100%" height="100%"/>
                    </PurpleRain>
                </div>
            </div>
        </Modal>
    )
}