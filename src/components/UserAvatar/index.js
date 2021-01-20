import React, { useEffect, useState } from 'react';
import { Edit2 } from 'react-feather';

import { Form, FormFileUpload, Loader } from '..';
import { useAuth, useFirestoreCrud, useFirestoreQuery, useFirebaseStorage } from '../../firebase';
import styles from './UserAvatar.module.scss';


export default () => {
    const { user } = useAuth();
    const { getDownloadURL, state: { data: userAvatar } } = useFirebaseStorage(user.avatar);
    const { uploadFile: uploadNewAvatar, state: { data: updatedUserAvatarData, status: updatedUserAvatarStatus } } = useFirebaseStorage();
    const { updateDocument } = useFirestoreCrud()
    const [ updatedAvatar, setUpdatedAvatar ] = useState();
    
    console.log(updatedUserAvatarStatus)
    
    useEffect(() => {
        getDownloadURL();
    }, [])
    
    useEffect(() => {
        if (updatedAvatar) uploadNewAvatar(updatedAvatar, `users/${ user.uid }`, 'avatar');
    }, [updatedAvatar])
    
    useEffect(() => {
        if (updatedUserAvatarData) updateDocument({
            avatar: updatedUserAvatarData.path
        }, `users/${ user.uid }`)
    }, [updatedUserAvatarData])
    
    if (!userAvatar) return <Loader />
    return (
        <div className="clickable">  
            <Form onChange={v => setUpdatedAvatar(v.avatar[0])}>
                {/* <FormField name="test" label="test" /> */}
                <FormFileUpload label="Avatar" name="avatar" loading={ updatedUserAvatarStatus === 'loading' } placeholder={
                    <div className={ styles.editable }>
                        <div className={ styles.icon }><Edit2 /></div>
                        <img width="100%" src={ userAvatar } />
                    </div>
                } />
            </Form>
        </div>
    )
}