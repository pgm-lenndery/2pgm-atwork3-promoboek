import React from 'react';
import { Link } from 'react-router-dom';
import { Minimize } from 'react-feather';

import './index.scss';

export default ({ children }) => {    
/**
 * TODO: when minimalizing, save as tab on bottom with url as parameter
 */

const minimalizeModal = () => {
    
}

return (
    <div className="boxModal">
        <div className="boxModal__actions">
            <Link className="boxModal__action" to='/'>close</Link>
            <Link className="boxModal__action" to='/' onClick={() => minimalizeModal()}>min</Link>
        </div>
        <div className="boxModal__body">
            { children }
        </div>
    </div>
)
}