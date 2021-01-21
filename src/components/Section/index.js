import React from 'react';
import styles from './Section.module.scss';
import Fade from 'react-reveal/Fade';

export default ({ spacing = 'none', children }) => {
    return (
        <Fade bottom>
            <div className={ styles[spacing] }>
                { children }
            </div>
        </Fade>
    )
}