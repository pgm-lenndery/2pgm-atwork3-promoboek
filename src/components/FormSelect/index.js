import React from 'react';
import { useFormContext } from "react-hook-form";
import styles from './FormSelect.module.scss';

export default ({ options = [], defaultValue, name, label: FormLabel, config: { value = 'value', label = 'label' } }) => {
    const { register } = useFormContext();
    
    return (
        <label className={ `${styles.select} form-element` }>
            <span>{ FormLabel }</span>
            <select ref={ register } name={ name } value={ defaultValue }>
                { options.map((o, index) => 
                    <option key={ index } value={ o[value] }>{ o[label] }</option>
                )}
            </select>
        </label>
    )
}