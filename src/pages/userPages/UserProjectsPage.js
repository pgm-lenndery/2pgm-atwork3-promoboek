import React, { useEffect } from 'react';
import { BoxCard, Works, Button, Anker, Modal, Loader } from '../../components';
import { useAuth, useFirestoreQuery, useLazyFirestoreQuery } from '../../firebase';

export default () => {
    const { user } = useAuth()
    const { data: projectsData } = useFirestoreQuery(fs => fs.collection('projects').where('creator', '==', user.uid))
    
    if (!projectsData) return <Loader />
    else return (
        <>
            <div className="d-flex align-items-center justify-content-between mb-5">
                <h4>Je kan nog { 3 - (projectsData?.length || 3) }<br/>project(en) toevoegen</h4>
                <Anker title="Project toevoegen" href="/account/projecten/nieuw" className="mt-0" theme={ projectsData?.length === 3 ? 'disabled' : 'default' }/>
            </div>
            {
                projectsData.length === 0 ? 
                <div>
                    <div className="label small text-center">Geen projecten gevonden</div>
                    <h3 className="text-center">Voeg projecten toe</h3>
                    <Anker title="Nieuw project" href="/account/projecten/nieuw" className="mx-auto"/>
                </div> :
                <Works data={ projectsData } />
            }
        </>
    )
}