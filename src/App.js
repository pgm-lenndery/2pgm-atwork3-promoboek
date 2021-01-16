import { useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ModalRoute, ModalContainer } from 'react-router-modal';
import { useForm, FormProvider, useFormContext } from "react-hook-form";

import { AuthProvider, useAuth } from './firebase'
import { Container, FloatCard, Works, Modal, SectionFilter, SectionHeader, Section, ProtectedModalRoute } from "./components";
import { ModalContext } from './contexts';
import { ProjectsOverviewPage, StudentsOverviewPage, RegisterPage, AccountPage } from './pages';

const App = () => {   
    const [ modal, setModal ] = useState(false);    
    const methods = useForm();
    
    return (
        <AuthProvider>
            <FormProvider {...methods}>
                <Router basename="#!">
                    <ModalContext.Provider value={[ modal, setModal ]}>
                        <AppWrapper />
                    </ModalContext.Provider>
                </Router>
            </FormProvider>
        </AuthProvider>
    );
}

const filterOptions = [
    {value: null, label: 'alles', checked: true},
    {value: 'cmo'},
    {value: 'gmb'},
    {value: 'nmd'},
    {value: 'avd'},
    {value: 'pgm'}
]

const AppWrapper = () => {
    const { user } = useAuth()

    return (
        <>
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
            <ModalRoute exact={ true } path={['/projecten/:id', '/projecten']}><ProjectsOverviewPage /></ModalRoute>
            <ModalRoute exact={ true } path={['/studenten/:id', '/studenten']}><StudentsOverviewPage /></ModalRoute>
            <ModalRoute exact={ true } path={['/account/registreren']}><RegisterPage /></ModalRoute>
            <ModalRoute exact={ true } path={['/account/registreren/lel']}><RegisterPage /></ModalRoute>
            <ProtectedModalRoute exact={ true } path={[ '/account' ]}><AccountPage /></ProtectedModalRoute>
            <ModalContainer/>
        </>
    )
}

export default App