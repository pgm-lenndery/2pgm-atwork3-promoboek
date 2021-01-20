import React from 'react';
import styles from './StudentsList.module.scss';
import { useFirestoreQuery } from '../../firebase';
import { StudentCard, Loader } from '..';

export default ({ data }) => {
    const { data: studentsData } = useFirestoreQuery(fs => fs.collection("users").where('role', '==', 'student').limit(12));
    
    return (
        <div className={ styles.container }>
            {
                !studentsData ? <Loader /> : 
                (data || studentsData).map(s => 
                    <StudentCard
                        key={ s.id } 
                        firstName={ s.firstName }
                        lastName={ s.lastName } 
                        avatar={ s.avatar }
                        theme="simple"
                    />
                )
            }
        </div>
    )
}