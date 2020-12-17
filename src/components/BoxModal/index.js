import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import './index.scss';

export default ({ children, trigger = null, toggle }) => {
    const [ open, setOpen ] = useState(false)
    
    const handleToggle = () => {
        setOpen(!open)
    }
    
    return (
        <Popup open={ open } trigger={ trigger } modal lockScroll className="modal__box" position="right center">
            { children }
        </Popup>
    )
}