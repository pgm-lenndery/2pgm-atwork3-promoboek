import React, { useEffect, useState } from 'react';
import { Form, FormField, FormButton, Modal, Anker, FormSelect, Loader, FormFileUpload } from '../../components';
import { useAuth, useFirebaseStorage, useFirestoreCrud, useFirestoreQuery } from '../../firebase';

export default () => {   
    const { user } = useAuth();
    const { addDocument, state: { status, data } } = useFirestoreCrud('projects');
    const { updateDocument: updateUserBanner, state: { status: updateUserBannerStatus, data: updateUserBannerData } } = useFirestoreCrud();
    const { data: coursesListData } = useFirestoreQuery(fs => fs.collection('courses'));
    const { data: { length: createdProjectsAmount = 3 } = {} } = useFirestoreQuery(fs => fs.collection('projects').where('creator', '==', user.uid));
    const { uploadFile: uploadBanner, state: { status: uploadBannerStatus, data: uploadBannerData } } = useFirebaseStorage();
    const [ fileToUpload, setFileToUpload ] = useState();
    
    const handleNewProject = ({ projectUrl, gitUrl, academicYear, banner: [ bannerFile ], ...otherValues }) => {
        setFileToUpload(bannerFile);
        addDocument({
            ...otherValues,
            academicYear: new Date(academicYear),
            links: {
                project: projectUrl,
                git: gitUrl
            },
            creator: user.uid
        });
    }
    
    useEffect(() => {
        if (status === 'success') uploadBanner(fileToUpload, `projects/${data.id}`);
    }, [status])
    
    useEffect(() => {
        if (uploadBannerStatus === 'success') updateUserBanner({
            banner: uploadBannerData.path
        }, `projects/${data.id}`)
    }, [uploadBannerStatus])
        
    if (status === 'success' && updateUserBannerStatus === 'success') return (
        <Modal
            title="Nieuw project"
            subtitle="voeg werk toe aan je profiel"
        >
            <div className="label small text-center">Project aangemaakt</div>
            <h2 className="text-center">{ data.title }</h2>
            <Anker href={`/projecten/${ data.id }`} title="Project bekijken" className="mx-auto"/>
        </Modal>
    )
    else return (
        <Modal 
            title="Nieuw project"
            subtitle="voeg werk toe aan je profiel"
        >
            {
                createdProjectsAmount >= 3 ?
                <div>
                    <div className="small label text-center">Te veel projecten</div>
                    <h3 className="text-center">Je voegde al 3 projecten toe</h3>
                    <p className="mb-0 mt-3 text-center text--body">Verwijder een ander project om een nieuw toe te voegen.</p>
                </div> :
                <Form onSubmit={ handleNewProject } loading={ status === 'loading' || updateUserBannerStatus === 'loading' }>
                    <FormFileUpload name="banner" label="Banner"/>
                    <FormField name="title" label="Project naam" />
                    <FormField name="intro" label="Introductie" />
                    <FormField name="description" label="Over dit project" />
                    <FormField name="tags" label="Tags" />
                    <FormSelect name="course" label="Vak" config={{ value: 'id' }} options={ coursesListData }/>
                    <FormField name="academicYear" label="Datum creatie" type="date" />
                    <div className="row form-element">
                        <div className="col">
                            <FormField name="projectUrl" label="Project link" type="url"/>
                        </div>
                        <div className="col">
                            <FormField name="gitUrl" label="Git repo link" type="url"/>
                        </div>
                    </div>
                    <FormButton loading={ status === 'loading' } title="Project aanmaken" />
                </Form>
            }
        </Modal>
    )
}