import React from 'react';
import { useFormContext } from "react-hook-form";
import Loader from 'react-loader-spinner'

import styles from './Form.module.scss';

export default ({ children, onSubmit, loading = false }) => {
    const { register, handleSubmit, getValues } = useFormContext();
    
    return (
        <form className={ styles.form } onSubmit={handleSubmit(onSubmit)}>
            { children }
            {loading && <div className={ styles.loadingOverlay }>
                <Loader type="Oval" color="#7f47dd" height={60} width={60} className="react-loader"/>
            </div>}
        </form>
    )
}