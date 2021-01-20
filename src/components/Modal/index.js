import React from 'react';
import { Link, useLocation, useHistory, useParams } from 'react-router-dom';
import { Minus, Plus, X } from 'react-feather';

import './index.scss';

export default ({ children, title = null, subtitle = null, afterHeaderComponents, beforeHeaderComponents, ignorePadding }) => { 
    const { pathname } = useLocation();
    const pathnameSplit = pathname.replace('/', '').split('/');
    
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
                <div className="boxModal__scrollable">   
                    { beforeHeaderComponents }
                    {(title || subtitle) && <div className="boxModal__header box">
                        <h1>{ title }</h1>
                        <p className="label">{ subtitle }</p>
                    </div>}
                    { afterHeaderComponents }
                    <div className={ `boxModal__body ${ignorePadding ? 'boxModal__body--ignore-padding' : ''}` }>
                        { children }
                    </div>
                </div>
                <div className="boxModal__crumbs crumbs">
                    <span className="crumbs__crumb crumbs__crumb--root">promobook</span> <span className="crumbs__separator">❯</span>
                    {pathnameSplit.map((p, index) =>
                        <Link to={ `${pathname.split('/').splice(0, index+2).join('/')}` } className="crumbs__crumb" key={ index }>
                            <span className="crumbs__crumb-label">{ p }</span> <span className="crumbs__separator">❯</span>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}