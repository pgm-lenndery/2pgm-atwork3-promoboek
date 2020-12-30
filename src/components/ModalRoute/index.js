import React, { useContext, useEffect, useRef } from 'react';
import {
  Route,
  useRouteMatch
} from "react-router-dom";

import { ModalContext } from '../../contexts';

export default ({ children, path = '', exact = true }) => {
    let match = useRouteMatch({
        path: path,
        exact: exact
    });
    const [ modal, setModal ] = useContext(ModalContext)
    const modalContent = useRef();
    
    useEffect(() => {
        setModal(modalContent.current);
    }, [modal])
    
    return (
        <div ref={modalContent}>
            { children }
        </div>
    )
}