import React from 'react';
import { useParams } from 'react-router-dom';
import { Modal } from '../components';
import { useAuth } from '../firebase';

export default () => {
    const { user } = useAuth();
    return (
        <Modal title={ `Hi ${ user.firstName }` } subtitle="beheer je account">
            <h3>Hi { user.firstName }</h3>
        </Modal>
    )
}