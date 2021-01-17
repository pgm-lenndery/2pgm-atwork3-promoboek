import React from 'react';
import { useFormContext } from "react-hook-form";
import styles from './FormSelect.module.scss';

export default ({ options, defaultValue, name, label }) => {
    const { register } = useFormContext();
    
    return (
        <label className={ `${styles.select} form-element` }>
            <span>{ label }</span>
            <select ref={ register } name={ name } value={ defaultValue }>
                { options.map(o => 
                    <option value={ o.value }>{ o.label }</option>
                )}
            </select>
        </label>
    )
}