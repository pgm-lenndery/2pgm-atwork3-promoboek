import React, { useState } from 'react';
import styles from './FormError.module.scss';

export default ({ visible = false, error = 'no error given' }) => {   
    return (
        <div
            className={`${ styles.error } ${ visible && styles.errorVisible }`}
        >{ error }</div>
    )
}