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
                        <div className={ styles.marquee }>javascript<span class="word--joint">・</span>html<span class="word--joint">・</span>animation<span class="word--joint">・</span>webpack<span class="word--joint">・</span>adobe illustrator<span class="word--joint">・</span>react<span class="word--joint">・</span>typescript<span class="word--joint">・</span>wordpress<span class="word--joint">・</span>svg<span class="word--joint">・</span>git<span class="word--joint">・</span>sass<span class="word--joint">・</span>firebase<span class="word--joint">・</span>bootstrap<span class="word--joint">・</span>indexeddb<span class="word--joint">・</span>adobe xd</div>
                    )}
                </Ticker>
            </Fade>
            <Fade bottom>
                <Section spacing="y">
                    <Container fluid>
                        <header className="App-header">
                            <h1 className="display-4">ontdek onze <br/>{ studentsAmount.length } studenten</h1>
                            <h5 className="label">Bekijk hun werk en wat hun drijft</h5>
                        </header>
                    </Container>
                </Section>
            </Fade>
        </>
    )
}