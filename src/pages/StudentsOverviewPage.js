import React from 'react';
import { useParams } from 'react-router-dom';
import { Modal, StudentCard, SectionFilter } from '../components';

import studentsData from '../faker/students.json';

export default () => {
    const { id } =  useParams()
    
    const filterOptions = [
        {value: null, label: 'alles', checked: true},
        {value: 'cmo'},
        {value: 'gmb'},
        {value: 'nmd'},
        {value: 'avd'},
        {value: 'pgm'}
    ]
    
    return (
        <Modal title="Studenten" subtitle="Deze studenten kozen voor onze richting" afterHeaderComponents={
            <SectionFilter label="filter projecten" spacing={false} items={ filterOptions } float={true} onSelect={option => console.log(option)}/>
        }>
            <p className="small label">academiejaar</p>
            <div className="flex-grid">
                <div className="flex-grid__wrapper">
                    {studentsData && studentsData.map(({ id, firstName, lastName, avatar }) =>
                        <StudentCard
                            key={ id } 
                            firstName={ firstName } 
                            lastName={ lastName }
                            avatar={ avatar }
                        />
                    )}
                </div>
            </div>
            { id }
        </Modal>
    )
}