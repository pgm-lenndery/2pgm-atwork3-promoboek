import React from 'react';
import { useParams } from 'react-router-dom';
import { Button, Modal } from '../components';
import { useAuth } from '../firebase';

export default () => {
    const { user, logout } = useAuth();
    
    return (
        <Modal title={ `Hi ${ user.firstName }` } subtitle="beheer je account">
            <h3>{ user.firstName } { user.lastName }</h3>
            <p>{ user.email }</p>
            <Button title="Afmelden" onClick={logout} />
        </Modal>
    )
}