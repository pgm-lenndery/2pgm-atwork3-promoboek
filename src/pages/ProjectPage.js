import React from 'react';
import { useParams } from 'react-router-dom';
import { Modal } from '../components';

export default () => {
    const { id } =  useParams()
    
    return (
        <Modal title="projecten" subtitle="subtitle">
            { id }
        </Modal>
    )
}