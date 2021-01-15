import { useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ModalRoute, ModalContainer } from 'react-router-modal';
import { useForm, FormProvider, useFormContext } from "react-hook-form";

import { AuthProvider } from './firebase'
import { Container, FloatCard, Works, Modal, SectionFilter, SectionHeader, Section, Cursor, Form, FormField } from "./components";
import { ModalContext } from './contexts';
import { ProjectsOverviewPage, StudentsOverviewPage, RegisterPage, AccountPage } from './pages';

const App = () => {   
    const [ modal, setModal ] = useState(false);    
    const methods = useForm();
    
    const filterOptions = [
        {value: null, label: 'alles', checked: true},
        {value: 'cmo'},
        {value: 'gmb'},
        {value: 'nmd'},
        {value: 'avd'},
        {value: 'pgm'}
    ]
    
    return (
        <AuthProvider>
            <FormProvider {...methods}>
                <Router basename="#!">
                    <ModalContext.Provider value={[ modal, setModal ]}>
                        <div className="App">
                            <header className="App-header">
                            </header>
                            <main>
                                <SectionHeader actionLabel="ontdek ze allemaal" to="/label">cases &amp;<br/>opdrachten</SectionHeader>
                                <SectionFilter label="filter projecten" spacing={ true } items={ filterOptions } float={false} onSelect={option => console.log(option)}/>
                                <Section spacing="b"> 
                                    <Works/>
                                </Section>
                                <SectionHeader actionLabel="ontdek ze allemaal" to="/studenten">onze &amp;<br/>studenten</SectionHeader>
                            </main>
                        </div>
                        <ModalRoute path={['/projecten/:id', '/projecten']}><ProjectsOverviewPage /></ModalRoute>
                        <ModalRoute path={['/studenten/:id', '/studenten']}><StudentsOverviewPage /></ModalRoute>
                        <ModalRoute path={['/account/registreren']}><RegisterPage /></ModalRoute>
                        <ModalRoute path={['/account']}><AccountPage /></ModalRoute>
                        <ModalContainer/>
                    </ModalContext.Provider>
                </Router>
            </FormProvider>
        </AuthProvider>
    );
}

export default App