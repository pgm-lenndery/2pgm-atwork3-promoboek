import React from 'react';
import { useFormContext } from "react-hook-form";
import styles from './FormField.module.scss';

export default ({ type = 'text', name, label }) => {
    const { register } = useFormContext();
    
    return (
        <label className={ `${styles.field} form-element` }>
            <input ref={ register } type={ type } name={ name } placeholder=" "/>
            <span>{ label }</span>
        </label>
    )
}