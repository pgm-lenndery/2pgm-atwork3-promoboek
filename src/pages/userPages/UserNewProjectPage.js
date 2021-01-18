import React, { useEffect } from 'react';
import { BoxCard, Works, Button, Form, FormField, FormButton, Modal, Anker, FormSelect, Loader } from '../../components';
import { useAuth, useFirestoreCrud, useFirestoreQuery } from '../../firebase';

export default () => {   
    const { user } = useAuth();
    const { addDocument, state: { status, data } } = useFirestoreCrud('projects');
    const { data: coursesListData } = useFirestoreQuery(fs => fs.collection('courses'))
    
    const handleNewProject = ({ projectUrl, gitUrl, academicYear, ...otherValues }) => {
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
    
    if (status === 'success') return (
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
            <Form onSubmit={handleNewProject} loading={ status === 'loading' }>
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
        </Modal>
    )
}