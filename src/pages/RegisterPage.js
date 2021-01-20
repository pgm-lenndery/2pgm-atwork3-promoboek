import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, FormField, Modal, FormFileUpload, FormButton } from '../components';
import { useAuth, useFirebaseStorage, useFirestoreCrud, useLazyFirestoreQuery } from '../firebase';

export default () => {
    const history = useHistory();
    const [ chosenAvatar, setChosenAvatar ] = useState([]);
    const { user, register, state: { status: registeringUserStatus } } = useAuth();
    const { uploadFile, state: { status: avatarUploadStatus, data } } = useFirebaseStorage();
    const { updateDocument } = useFirestoreCrud();
    
    const handleRegistration = ({ email, password, avatar, ...otherData}) => {
        setChosenAvatar(avatar);
        register(email, password, {
            role: 'student',
            ...otherData
        });
    }
    
    useEffect(() => {
        if (user?.email && registeringUserStatus === 'success') uploadFile(chosenAvatar[0], `users/${user.uid}`, 'avatar');
    }, [user, registeringUserStatus])
        
    useEffect(() => {
        if (avatarUploadStatus === 'success' ) {
            updateDocument({
                avatar: data.path
            }, `users/${ user.uid }`)
            history.push('/account');
        }
    }, [avatarUploadStatus])
    
    return (
        <Modal title="Registreren" subtitle="maak een account">
            {  registeringUserStatus === 'success' ?
                <div>Loading</div> :
                <Form onSubmit={handleRegistration} loading={ registeringUserStatus === 'loading' } defaultValues={{ email: 'smeerkaas@gmail.com' }}>
                    <FormFileUpload name="avatar" label="Avatar"/>
                    <div className="row form-element">
                        <div className="col">
                            <FormField name="firstName" label="Voornaam"/>
                        </div>
                        <div className="col">
                            <FormField name="lastName" label="Achternaam"/>
                        </div>
                    </div>
                    <FormField type="email" name="email" label="Email"/>
                    <FormField type="password" name="password" label="Wachtwoord"/>
                    <FormButton title="Registreren" loading={ registeringUserStatus === 'loading' } />
                </Form>
            }
        </Modal>
    )
}