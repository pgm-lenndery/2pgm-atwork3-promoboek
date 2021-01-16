import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { ModalRoute, ModalContainer } from 'react-router-modal';
import { Form, FormButton, FormError, FormField, Modal } from '..';
import { useAuth } from '../../firebase';

export default ({ path, children, exact = false }) => {
    const { user, login, state: { error, status } } = useAuth();    
    const handleLogin = ({ email, password }) => login(email, password);
    const match = useRouteMatch({
        path: path,
        exact: exact,
    });
    
    useEffect(() => {
        console.log(error);
        if (error) translateError(error);
        if (error) console.log('Deze gegevens kloppen niet')
    }, [error]);

    // dont show a modal if path doesn't match
    if (!match) return null
    
    // show indicator if user doesn't exist
    else if (!user) return <Modal><p>Laden</p></Modal>
    
    // show form if user isn't logged in
    else if (user && !user.email) return <ModalRoute exact={ exact }><Modal 
        title="Hi!"
        subtitle="Log in om verder te gaan"
    >
        <Form onSubmit={handleLogin}>
            <FormField name="email" type="email" label="Email" />
            <FormField name="password" type="password" label="Wachtwoord" />
            <FormError visible={ error && true } error={`${translateError(error)}`} />
            <FormButton title="Aanmelden" loading={ status === 'loading' } />
        </Form>
    </Modal></ModalRoute>
    
    // show component if user is logged in and path matches
    else return <ModalRoute path={ path }>{ children }</ModalRoute>
}

const translateError = ({ code = '' } = {}) => ({
    'auth/too-many-requests': 'Je hebt te vaak proberen aanmelde, probeer het later opnieuw',
    'auth/wrong-password': 'De gebruikte gegevens kloppen niet',
    'auth/user-not-found': 'De gebruikte gegevens kloppen niet',
    'auth/invalid-email': 'Je gaf geen geldig emailadres op',
}[code] || '')
