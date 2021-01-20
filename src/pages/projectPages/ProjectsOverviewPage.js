import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, SectionFilter, Works, Anker, Loader } from '../../components';
import { useAuth, useFirebaseStorage, useFirestoreQuery } from '../../firebase';

const extraFilterOptions = [
    { label: 'alles', checked: true, abbr: null }
]

export default () => {
    const { noUserFound } = useAuth()
    const { data: projectsData, refetch } = useFirestoreQuery(fs => fs.collection('projects'));
    const { data: coursesListData = [] } = useFirestoreQuery(fs => fs.collection('courses'));
    const [ filter, setFilter ] = useState({ abbr: null });
    
    useEffect(() => {
        if (filter.abbr === null) refetch()
        else {
            refetch(fs => fs.collection('projects').where('course', '==', filter.id))
        }
    }, [filter])
    
    return (
        <Modal 
            title="Cases &amp; opdrachten" 
            subtitle="werk van onze studenten"
            afterHeaderComponents={
                <SectionFilter 
                    label="filter projecten" 
                    items={[ ...extraFilterOptions, ...coursesListData ]} 
                    float={ false }
                    onSelect={ setFilter }
                />
            }
        >
            {
                projectsData?.length === 0 ?
                <div>
                    <div className="label small text-center">Bekijk een ander vak</div>
                    <h3 className="text-center">Geen projecten gevonden</h3>
                </div> : <Works data={ projectsData } />
            }
        </Modal>
    )
}