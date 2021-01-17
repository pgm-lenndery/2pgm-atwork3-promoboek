import React, { useEffect } from 'react';
import { BoxCard, Works, Button, Anker, Modal } from '../../components';

export default () => {   
    const projects = [];
    return (<>
        {
            projects.length === 0 ? 
            <div>
                <div className="label small text-center">Geen projecten gevonden</div>
                <h3 className="text-center">Voeg projecten toe</h3>
                <Anker title="Nieuw project" href="/account/projecten/nieuw" className="mx-auto"/>
            </div> :
            <Works />
        }
    </>)
}