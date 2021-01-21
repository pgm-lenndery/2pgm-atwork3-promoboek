import React from 'react';
import { Container } from '../../components';
import dayjs from 'dayjs';
import Fade from 'react-reveal/Fade';

import './index.scss';

export default ({ footerText }) => {

  const currentYear = dayjs().format('YYYY');
  const nextYear = dayjs(currentYear).add(1, 'year').format('YYYY');

  return (
    <Fade bottom>
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
          <Container className="copyright-container">
            <p className="small mb-0">INDUSTRIEWEG 232, 9030 MARIAKERKE (GENT)</p>
            <p className="label small mb-0">ALLE RECHTEN VOORBEHOUDEN © ARTEVELDEHOGESCHOOL { currentYear } - { nextYear }</p>
          </Container>
      </div>
    </Fade>
  )
}