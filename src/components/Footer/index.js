import React from 'react';
import { Container } from '../../components';

import './index.scss';

export default ({ footerText }) => {
  return (
      <div className="footer">
          <Container
            className="box--y"
            fluid
            
          >
            <div className="row">
              <div className="col-2">
                <div className="footer-logo box--x">
                  <img src="https://pgmgent-1920-students.github.io/case1-pgm-website-baas-pgm-lenndery/src/images/pgm_branding/logos/logo_pgm_klein_paars.svg"/>
                </div>
              </div>
              <div className="col-10">
                <div className="footer-text">
                  <h3>{ footerText }</h3>
                </div>
              </div>
            </div>
          </Container>
      </div>
  )
}