import React from 'react';
import { ArrowRight } from 'react-feather';
import {
  Link
} from "react-router-dom";
import Fade from 'react-reveal/Fade';

import './index.scss';
import { Container } from '..';

export default ({ children, actionLabel = '', to = '/' }) => {
    return (
        <Fade bottom>
            <Container theme="sectionHeader" className="sectionHeader box row" fluid>
                <div className="col-12 col-md-6 col-lg-8 sectionHeader__title">
                    <h2 className="display-4">{ children }</h2>
                </div>
                <Link to={ to } className="col-12 col-md-6 col-lg-4 sectionHeader__action action">
                    <div className="action__label">
                        { actionLabel }
                    </div>
                    <div className="action__icon">
                        <ArrowRight/>
                    </div>
                </Link>
            </Container>
        </Fade>
    )
}