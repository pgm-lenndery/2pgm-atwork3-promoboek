import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, FormField, Modal, FormFileUpload, FormButton } from '../components';
import { useAuth } from '../firebase';

export default () => {
    const { register, state: { status: registeringUserStatus } } = useAuth();
    const history = useHistory();
    
    const handleRegistration = ({ email, password, ...otherData}) => {
        register(email, password, {
            role: 'student',
            ...otherData
        });
    }
    
    useEffect(() => {
        if (registeringUserStatus === 'success') history.push('/account');
    }, [registeringUserStatus])
    
    return (
        <Modal title="Registreren" subtitle="maak een account">
            <Form onSubmit={handleRegistration}>
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
                <FormButton title="Registreren" />
            </Form>
        </Modal>
    )
}