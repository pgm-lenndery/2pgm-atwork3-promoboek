import React from 'react';
import { useParams } from 'react-router-dom';
import { Modal, StudentCard, SectionFilter } from '../components';


export default () => {
    const { id } =  useParams()
    
    return (
        <Modal title="Studenten" subtitle="Deze studenten kozen voor onze richting" >
            <p className="small label">academiejaar</p>

        </Modal>
    )
}