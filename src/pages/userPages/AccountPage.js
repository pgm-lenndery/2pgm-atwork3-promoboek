import React, { useEffect, useState } from 'react';
import { Button, Loader, Modal, Wrapper, Form, FormButton, FormField, EditField, FormFileUpload, UserAvatar } from '../../components';
import { useAuth, useFirebaseStorage, useFirestoreCrud, auth, useFirestoreQuery } from '../../firebase';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { UserProjectsPage } from '..';


export default () => {
    const { user, logout } = useAuth();
    const { getDownloadURL, state: { data: userAvatar = '' } } = useFirebaseStorage(user.avatar);
    const { uploadFile: uploadNewAvatar, state: { data: updatedUserAvatarData, status } } = useFirebaseStorage();
    const { updateDocument } = useFirestoreCrud()
    const [ editMode, setEditMode ] = useState(false);
    const [ updatedAvatar, setUpdatedAvatar ] = useState();
    
    useEffect(() => {
        getDownloadURL();
    }, [])

    const handleEdit = ({ email, ...otherData }) => {
        updateDocument({
            ...otherData
        }, `users/${ user.uid }`)

        auth.currentUser.updateEmail(email);
        setEditMode(false);
    }
    
    useEffect(() => {
        if (updatedAvatar) uploadNewAvatar(updatedAvatar, `users/${ user.uid }`, 'avatar');
    }, [updatedAvatar])
    
    useEffect(() => {
        if (updatedUserAvatarData) updateDocument({
            avatar: updatedUserAvatarData.path
        }, `users/${ user.uid }`)
    }, [updatedUserAvatarData])
    
    return (
        <Modal 
            title={ `Hi ${ user.firstName }` } 
            subtitle="beheer je account"
            ignorePadding
        >
            <Tabs>
                <TabList>
                    <Tab>Account</Tab>
                    <Tab>Projects</Tab>
                </TabList>

                <Wrapper>
                    <TabPanel>
                        <div className="row">
                            <div className="col-12 col-lg-3">
                                <UserAvatar />
                            </div>
                            <div className="col-12 col-lg-9">
                                { editMode ? 
                                    <Form onSubmit={handleEdit} defaultValues={{ firstName: user.firstName, lastName: user.lastName, email: user.email }}>
                                        <div className="row form-element">
                                            <div className="col">
                                                <FormField name="firstName" label="Voornaam" type="text"/>
                                            </div>
                                            <div className="col">
                                                <FormField name="lastName" label="Achternaam" type="text"/>
                                            </div>
                                        </div>
                                        <FormField name="email" label="Email" type="text"/>
                                        <FormButton title="Edit"/>
                                        <Button title="Cancel" onClick={() => setEditMode(false)} />
                                    </Form> :
                                    <>
                                        <h3 className="text--initial">{ user.firstName } { user.lastName }</h3>
                                        <p className="small label">{ user.email }</p>
                                        <Button title="Account Aanpassen" onClick={() => setEditMode(true)} />
                                        <Button title="Afmelden" onClick={logout} />
                                    </>
                                }
                            </div>
                        </div>
                        </TabPanel>
                    <TabPanel>
                        <UserProjectsPage />
                    </TabPanel>
                </Wrapper>
            </Tabs>
        </Modal>
    )
}