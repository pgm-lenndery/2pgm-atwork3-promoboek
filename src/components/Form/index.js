import React, { useEffect } from 'react';
import { useFormContext } from "react-hook-form";
import Loader from 'react-loader-spinner'

import styles from './Form.module.scss';

export default ({ children, onSubmit, loading = false, defaultValues = {}, onChange, className = '' }) => {
    const { handleSubmit, setValue } = useFormContext();
    
    useEffect(() => {
        Object.keys(defaultValues).forEach((v) => {
            setValue(v, defaultValues[v])
        })
    }, [])
    
    return (
        <form className={ `${styles.form} ${ loading ? 'form--loading' : ''} ${ className }` } onChange={onChange && handleSubmit(onChange)} onSubmit={handleSubmit(onSubmit)}>
            { children }
            {loading && <div className={ styles.loadingOverlay }>
                <Loader type="Oval" color="#7f47dd" height={60} width={60} className="react-loader"/>
            </div>}
        </form>
    )
}