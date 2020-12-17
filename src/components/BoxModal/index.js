import React, { useContext, useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import { X, Minimize } from 'react-feather';

import { ModalContext } from '../../contexts';
import './index.scss';

export default ({ children, trigger = null, toggle }) => {
    const [ modal, setModal ] = useContext(ModalContext);
    
    /**
     * TODO: when minimalizing, save as tab on bottom with url as parameter
     */
    
    return (
        <Popup 
            open={ modal ? true : false } 
            trigger={ trigger } 
            onClose={() => setModal(false)} 
            modal 
            lockScroll 
            className="modal__box" 
            position="right center"
        >
            <div className="modal__actions">
                <button onClick={() => setModal(false)}>close</button>
                <button onClick={() => setModal(false)}>min</button>
            </div>
            <div className="modal__body">  
                { modal }
            </div>
        </Popup>
    )
}