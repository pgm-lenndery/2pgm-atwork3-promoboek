import React, { useEffect } from 'react';
import { BoxCard, Works, Button, Anker, Modal, Loader } from '../../components';
import { useAuth, useFirestoreQuery, useLazyFirestoreQuery } from '../../firebase';

export default () => {
    const { user } = useAuth()
    const { data: projectsData } = useFirestoreQuery(fs => fs.collection('projects').where('creator', '==', user.uid))
    console.log({ projectsData })
    
    if (!projectsData) return <Loader />
    else return (
        <>
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