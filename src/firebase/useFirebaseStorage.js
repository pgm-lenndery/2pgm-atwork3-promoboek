import React, { useReducer, useEffect, useState } from 'react';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import fileExtension from 'file-extension';
import mime from 'mime-types';

import { storage } from './firebase';

const reducer = (state, action) => {
    switch (action.type) {
        case "idle":
            return { status: "idle", data: undefined, error: undefined };
        case "loading":
            return { status: "loading", data: undefined, error: undefined };
        case "success":
            return { status: "success", data: action.payload, error: undefined };
        case "error":
            return { status: "error", data: undefined, error: action.payload };
        default:
            throw new Error("invalid action");
    }
}

/**
 * Get or upload files from Firebase storage
 * @param {string} storagePath The path that is used by Firebase to store the file
 */
export const useFirebaseStorage = (storagePath = '') => {
    const initialState = { 
        status: "idle", 
        data: undefined, 
        error: undefined 
    }
    
    const [ state, dispatch ] = useReducer(reducer, initialState);
    const [ returnedState, setReturnedState ] = useState({ type: "idle" })
    
    /**
     * Get the downloadURL of a, on Firebase stored, file
     * @param {string} storagePath Overrides the global storagePath
     * @returns A url to the file
     */
    const getDownloadURL = async (path = storagePath) => {
        dispatch({ type: "loading" });
        
        storage.ref(path).getDownloadURL()
        .then(uri => dispatch({ type: "success", payload: uri }))
        .catch(err => dispatch({ type: "error", payload: err }))
    }
    
    /**
     * 
     * @param {string} file The path to the file on the device
     * @param {string} path Overrides the global storagePath. When uploading files, do exclude the filename.
     * @param {string} fileName Choose a custom name for the file that is uploaded, this overrides the random Id, do exclude the extension
     */
    const uploadFile = async (file, path = storagePath, fileName ) => {
        dispatch({ type: "loading" });
        
        try {            
            const url = URL.createObjectURL(file);
            
            // fetch file
            const response = await fetch(url);
            
            // get blob from fetch response
            const blob = await response.blob();
            
            // get mime-type of file
            const mimeType = blob.type;
            
            // get extension of file
            const ext = mime.extension(blob.type);
            
            // create Storage reference
            const rootStorageRef = storage.ref();
            
            // compose storagePath, based on the chosen path, a random Id and the file extension
            const composedPath = path + `/${!fileName ? uuidv4() : fileName}` + `.${ext}`;
            
            // create reference to storagePath
            const upload = rootStorageRef.child(composedPath).put(blob, { 
                contentType: mimeType,
            });
            
            // change returned state based on upload status
            upload.on('state_changed', snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                
                dispatch({ type: "loading", payload: {
                    progress: progress,
                    ext: ext,
                    path: composedPath
                }});  
                 
                // switch (snapshot.state) {
                //     case storage.TaskState.PAUSED: // or 'paused'
                //         console.log('Upload is paused');
                //         break;
                //     case storage.TaskState.RUNNING: // or 'running'
                //         console.log('Upload is running');
                //         break;
                // }
            }, err => {
                dispatch({ type: "error", payload: err });
            }, async success => {
                const uri = await upload.snapshot.ref.getDownloadURL()
                dispatch({ type: "success", payload: {
                    progress: 100,
                    ext: ext,
                    path: composedPath,
                    uri: await uri
                }})
                // dispatch({ type: "idle" });
            })         
        } catch (err) {
            dispatch({ type: "error", payload: returnedState });
        }
    }
    
    return { state, getDownloadURL, uploadFile }
}