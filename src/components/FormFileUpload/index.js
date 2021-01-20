import React, { useState } from 'react';
import { useFormContext } from "react-hook-form";
import { Loader } from '..';
import { useFirebaseStorage } from '../../firebase';
import styles from './FormFileUpload.module.scss';

export default ({ name, label, multiple = false, loading = false, placeholder }) => {
    const { register } = useFormContext();
    const [ selectedFile, setSelectedFile ] = useState([]);
    const [ draggedOver, setDraggedOver ] = useState(false);
    // const { uploadFile, state } = useFirebaseStorage('avatars');
    
    const handleDrop = async ({ target: { files }}) => {
        setSelectedFile([...files]);
    }
    
    const handleDragOver = e => setDraggedOver(true)
    const handleDragEnd = e => setDraggedOver(false)
    
    if (loading) return <Loader />
    else return (
        <label 
            className={ `${ placeholder ? styles.field : styles.defaultField} form-element ${draggedOver ? styles.dragOver : ''} ${selectedFile.length > 0 ? styles.hasFiles : ''}`} 
            onDragEnter={handleDragOver} 
            onDragLeave={handleDragEnd}
        >
            <div>
                {
                    placeholder ? placeholder :
                    <>
                        <div>
                            <h4>{ label }</h4>
                            <small>Sleep een bestand naar hier of klik om te selecteren</small>
                        </div>
                        {!selectedFile ? <small>Geen bestand geselecteerd</small> : <ul className={ styles.list }>{ selectedFile.map((f, index) =>
                            <li key={ index }>{ f.name }</li>
                        )}</ul>}
                    </>
                }
            </div>
            <input ref={ register } type="file" name={ name } onChange={(e, event) => handleDrop(e, event)}/>
        </label>
    )
}