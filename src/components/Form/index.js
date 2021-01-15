import React from 'react';
import { useFormContext } from "react-hook-form";

export default ({ children, onSubmit }) => {
    const { register, handleSubmit, getValues } = useFormContext();
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            { children }
        </form>
    )
}