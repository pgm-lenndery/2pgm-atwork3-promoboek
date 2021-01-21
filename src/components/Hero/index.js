import React from 'react';
import Ticker from 'react-ticker'
import { useFirestoreQuery } from '../../firebase';
import { Container, Section } from '..';
import styles from './Hero.module.scss';
import Fade from 'react-reveal/Fade';

export default () => {
    const { data: studentsAmount = [] } = useFirestoreQuery(fs => fs.collection('users').where('role', '==', 'student').where('periodEnd', '==', '2021'))
    
    return (
        <>
            <Fade top>
                <Section spacing="y">
                    <Container fluid>
                        <img width="300" src="https://pgmgent-1920-students.github.io/case1-pgm-website-baas-pgm-lenndery/src/images/pgm_branding/logos/logo_graduaat_programmeren.svg"/>
                    </Container>
                </Section>
                <Ticker mode="smooth">
                    {({ index }) => (
                        <div className={ styles.marquee }>javascript<span className="word--joint">・</span>html<span className="word--joint">・</span>animation<span className="word--joint">・</span>webpack<span className="word--joint">・</span>adobe illustrator<span className="word--joint">・</span>react<span className="word--joint">・</span>typescript<span className="word--joint">・</span>wordpress<span className="word--joint">・</span>svg<span className="word--joint">・</span>git<span className="word--joint">・</span>sass<span className="word--joint">・</span>firebase<span className="word--joint">・</span>bootstrap<span className="word--joint">・</span>indexeddb<span className="word--joint">・</span>adobe xd</div>
                    )}
                </Ticker>
            </Fade>
            <Fade bottom>
                <header className={ styles.header }>
                    <Container fluid>
                            <h1 className="display-3">ontdek onze <br className="d-none d-lg-block"/>{ studentsAmount.length } studenten</h1>
                            <h5 className="label">Bekijk hun werk en wat hun drijft</h5>
                    </Container>
                    <div className={ styles.backgroundWrapper }>
                        <img className={ styles.background } src="https://pgmgent-1920-students.github.io/case1-pgm-website-baas-pgm-lenndery/src/images/pgm_branding/logos/logo_pgm_klein_wit.svg" alt=""/>
                    </div>
                </header>
            </Fade>
        </>
    )
}