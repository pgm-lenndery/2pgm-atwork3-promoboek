import { useState } from 'react';
import './App.scss';
import { BrowserRouter as Router } from "react-router-dom";
import { ModalRoute, ModalContainer } from 'react-router-modal';
import { useForm, FormProvider } from "react-hook-form";

import { AuthProvider, useAuth } from './firebase'
import { Works, SectionFilter, SectionHeader, Section, ProtectedModalRoute } from "./components";
import { ModalContext } from './contexts';
import { ProjectsOverviewPage, StudentsOverviewPage, RegisterPage, AccountPage, UserNewProjectPage } from './pages';

import 'dayjs/locale/nl-be';

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
            <ModalRoute exact={ true } path={['/projecten']}><ProjectsOverviewPage /></ModalRoute>
            <ModalRoute exact={ true } path={['/projecten/:id']}><ProjectsOverviewPage /></ModalRoute>
            <ModalRoute exact={ true } path={['/studenten/:id']}><StudentsOverviewPage /></ModalRoute>
            <ModalRoute exact={ true } path={['/account/registreren']}><RegisterPage /></ModalRoute>
            <ProtectedModalRoute exact={ true } path={[ '/account' ]}><AccountPage /></ProtectedModalRoute>
            <ProtectedModalRoute exact={ true } path={['/account/projecten/nieuw']}><UserNewProjectPage /></ProtectedModalRoute>
            <ModalContainer/>
        </>
    )
}

export default App