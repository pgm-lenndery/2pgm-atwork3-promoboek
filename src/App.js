import { useState } from 'react';
import './App.scss';
import { BrowserRouter as Router } from "react-router-dom";
import { ModalRoute, ModalContainer } from 'react-router-modal';
import { useForm, FormProvider } from "react-hook-form";

import { AuthProvider, useAuth, useFirestoreQuery } from './firebase'
import { Works, SectionFilter, SectionHeader, Section, ProtectedModalRoute, Loader, StudentCard } from "./components";
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

const extraFilterOptions = [
    {llama: null, label: 'alles', checked: true}
]

const AppWrapper = () => {
    const { user } = useAuth()
    const { data: coursesListData = [] } = useFirestoreQuery(fs => fs.collection('courses'))
    const { data: projectsData } = useFirestoreQuery(fs => fs.collection('projects').limit(9))
    const { data: studentsData } = useFirestoreQuery(fs => fs.collection("users").where('role', '==', 'student').limit(12))
    
    return (
        <>
            <div className="App">
                <header className="App-header">
                </header>
                <main>
                    <SectionHeader actionLabel="ontdek ze allemaal" to="/label">cases &amp;<br/>opdrachten</SectionHeader>
                    <SectionFilter 
                        label="filter projecten" 
                        spacing={ true } 
                        items={[ ...extraFilterOptions, ...coursesListData ]} 
                        float={ false } 
                        config={{ value: 'llama' }}
                        onSelect={option => console.log(option)}
                    />
                    <Section spacing="b"> 
                        <Works data={ projectsData }/>
                    </Section>
                    <SectionHeader actionLabel="ontdek ze allemaal" to="/studenten">onze &amp;<br/>studenten</SectionHeader>
                    <Section spacing="b"> 
                        <div className="student-list">
                            {
                                !studentsData ? <Loader /> : 
                                studentsData.map(s => 
                                    <StudentCard key={ s.id } 
                                        firstName={ s.firstName }
                                        lastName={ s.lastName } 
                                        avatar={ 'https://i.fok.nl/userpics/155136/vanleemhuyzen.jpg' }
                                    />
                                )
                            }
                        </div>
                    </Section>
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