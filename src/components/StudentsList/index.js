import React from 'react';
import styles from './StudentsList.module.scss';
import { useFirestoreQuery } from '../../firebase';
import { StudentCard, Loader } from '..';

export default ({ data }) => {
    const { data: studentsData } = useFirestoreQuery(fs => fs.collection("users").where('role', '==', 'student').limit(12));
    
    return (
        <div className={ `${ styles.container }` }>
            <div className={ `${ styles.wrapper } container-fluid`}>
                {
                    !studentsData ? <Loader /> : 
                    studentsData.map((s, index) => 
                        <StudentCard
                            key={ index } 
                            firstName={ s.firstName }
                            lastName={ s.lastName } 
                            avatar={ s.avatar }
                            studentData={ s }
                            theme="simple"
                        />
                    )
                }
            </div>
        </div>
    )
}