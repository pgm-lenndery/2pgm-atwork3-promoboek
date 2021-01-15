import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Form, FormField, Modal } from '../components';
import { useAuth } from '../firebase';

export default () => {
    const { register, state: { status: registeringUserStatus } } = useAuth();
    const history = useHistory();
    
    const handleRegistration = ({ email, password, ...otherData}) => {
        register(email, password, otherData);
    }
    
    useEffect(() => {
        if (registeringUserStatus === 'success') history.push('/account');
    }, [registeringUserStatus])
    
    return (
        <Modal title="Registreren" subtitle="maak een account">
            <Form onSubmit={handleRegistration}>
                <div className="row FormField__group">
                    <div className="col">
                        <FormField name="firstName" label="Voornaam"/>
                    </div>
                    <div className="col">
                        <FormField name="lastName" label="Achternaam"/>
                    </div>
                </div>
                <FormField type="email" name="email" label="Email"/>
                <FormField type="password" name="password" label="Wachtwoord"/>
                
                <button type="submit">enter</button>
            </Form>
        </Modal>
    )
}