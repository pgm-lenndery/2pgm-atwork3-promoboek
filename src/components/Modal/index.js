import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, X } from 'react-feather';

import './index.scss';

export default ({ children, title = null, subtitle = null }) => {    
    /**
     * TODO: when minimalizing, save as tab on bottom with url as parameter
     */

    const minimalizeModal = () => {
        
    }

    return (
        <div className="boxModal">
            <div className="boxModal__actions">
                <Link className="boxModal__action" to='/'><X /></Link>
                <Link className="boxModal__action" to='/' onClick={() => minimalizeModal()}><Minus /></Link>
            </div>
            <div className="boxModal__wrapper">
                { (title || subtitle) && <div className="boxModal__header">
                    <h1>{ title }</h1>
                    <p className="label">{ subtitle }</p>
                </div>}
                <div className="boxModal__body">
                    { children }
                </div>
            </div>
        </div>
    )
}