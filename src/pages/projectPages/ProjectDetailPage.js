import React, { useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import dayjs from 'dayjs'

import { Loader, Modal, Anker, Button } from '../../components';
import { useFirebaseStorage, useFirestoreQuery, useLazyFirestoreQuery, useAuth, useFirestoreCrud } from '../../firebase';

const dummImage = 'https://res.cloudinary.com/lennertderyck/image/upload/v1605652329/Schermafbeelding_2020-11-17_om_23.22.51_h9rh7h.png';

export default () => {
    const { user } = useAuth();
    const history = useHistory()
    const { id } = useParams();
    const { data: projectData } = useFirestoreQuery(fs => fs.doc(`projects/${ id }`))
    const { fetchQuery: fetchCreatorData, data: creatorData } = useLazyFirestoreQuery();
    const { fetchQuery: fetchCourseData, data: courseData } = useLazyFirestoreQuery();
    const { getDownloadURL, state: { data: bannerUrl } } = useFirebaseStorage();
    const { deleteDocument: deleteProject, state: { status: deleteProjectStatus } } = useFirestoreCrud('projects')
    
    useEffect(() => {
        if (projectData) {
            fetchCreatorData(fs => fs.doc(`users/${projectData.creator}`))
            fetchCourseData(fs => fs.doc(`courses/${projectData.course}`))
            getDownloadURL(projectData.banner);
        }
    }, [projectData])
    
    const handleDelete = () => {
        deleteProject(id)
    }
    
    useEffect(() => {
        if (deleteProjectStatus === 'success') history.goBack();
    }, [deleteProjectStatus])
        
    if (!projectData) return <Loader />
    else {
        const { title, intro, description, academicYear, } = projectData;
        return (
            <Modal title={ title } subtitle={ intro } 
                afterHeaderComponents={
                    <img src={ bannerUrl || dummImage } width="100%" height={ 200 } alt=""/>
                }
                crumbs={[ 'studenten', 'lel']}
            >
                <div className="row">
                    <div className="col-12 col-md-8 col-xl-9">
                        <div className="btn-group">
                            { user?.uid === projectData.creator && 
                                <>
                                    <Anker className="mt-0 mb-4" title="Project aanpassen" href={`/projecten/${id}/edit`} />
                                    <Button className="mt-0 mb-4" title="Project verwijderen" theme="outline" loading={ deleteProjectStatus === 'loading' } onClick={ handleDelete }/>
                                </>
                            }
                        </div>
                        <div className="label small mb-3">Over deze opdracht</div>
                        <div className="text--body">{ description }</div>
                    </div>
                    <div className="col-12 col-md-4 col-xl-3">
                        <div className="mb-3">
                            <p className="label small mb-2">Periode</p>
                            { dayjs(academicYear.seconds * 1000).format('YYYY') }
                        </div>
                        <div className="mb-3">
                            <p className="label small mb-2">Vak</p>
                            {
                                !courseData ?
                                <Loader /> :
                                <> { courseData.label }</>
                            }
                        </div>
                        <div className="mb-3"> 
                            <p className="label small mb-2">Student</p>
                                {
                                    !creatorData ?
                                    <Loader /> :
                                    <Link to={ `/studenten/${creatorData.id}` }><span className="text--initial-case">{ creatorData.firstName } { creatorData.lastName }</span></Link>
                                }
                        </div>
                        
                    </div>
                </div>
            </Modal>
        )
    }
}