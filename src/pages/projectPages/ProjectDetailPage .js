import React from 'react';
import { useParams } from 'react-router-dom';
import { Modal } from '../../components';

export default () => {
    const { id } =  useParams()
    
    return (
        <Modal title="Cases &amp; opdrachten" subtitle="werk van onze studenten">
            { id }
        </Modal>
    )
}