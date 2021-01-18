import React from 'react';
import { useFormContext } from "react-hook-form";
import styles from './FormField.module.scss';
import dayjs from 'dayjs'

export default ({ type = 'text', name, label }) => {
    const { register } = useFormContext();
    
    const today = dayjs().format('YYYY-MM-DD')
    return (
        <label className={ `${styles.field} form-element` }>
            <input ref={ register } type={ type } name={ name } defaultValue={ type === 'date' ? today : null } placeholder=" "/>
            <span>{ label }</span>
        </label>
    )
}