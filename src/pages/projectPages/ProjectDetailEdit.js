import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import dayjs from 'dayjs'

import { Loader, Modal, Form, FormField, FormFileUpload, FormSelect, FormButton } from '../../components';
import { useFirebaseStorage, useFirestoreQuery, useLazyFirestoreQuery, useFirestoreCrud } from '../../firebase';

export default () => {
    const history = useHistory();
    const { id } = useParams();
    const { data: projectData } = useFirestoreQuery(fs => fs.doc(`projects/${ id }`));
    const { data: coursesListData } = useFirestoreQuery(fs => fs.collection('courses'));
    const { fetchQuery: fetchCreatorData, data: creatorData } = useLazyFirestoreQuery();
    const { fetchQuery: fetchCourseData, data: courseData } = useLazyFirestoreQuery();
    const { getDownloadURL, state: { data: bannerUrl } } = useFirebaseStorage();
    const { updateDocument, state: { status: updateDocState, error  } } = useFirestoreCrud(`projects/${id}`);
    const [ fileToUpload, setFileToUpload ] = useState();

    const handleEditProject = ({ projectUrl, gitUrl, academicYear, banner: [ bannerFile ], ...otherValues }) => {
        setFileToUpload(bannerFile);
        updateDocument({
            ...otherValues,
            academicYear: new Date(academicYear),
            links: {
                project: projectUrl,
                git: gitUrl
            }
        });
    }

    useEffect(() => {
        if (updateDocState === 'success') history.push(`/projecten/${id}`);
    }, [updateDocState])
        
    if (!projectData) return <Loader />
    else {
        const { banner, title, intro, description, tags} = projectData;
        return (
            <Modal>

              <Form onSubmit={ handleEditProject } loading={updateDocState === "loading"} defaultValues={{ banner: banner, title: title, intro: intro, description: description, tags: tags }}>
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
                <FormButton title="Project aanpassen" loading={updateDocState === "loading"}/>
              </Form>

            </Modal>
        )
    }
}