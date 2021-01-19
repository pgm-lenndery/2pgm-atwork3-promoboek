import { useState, useEffect } from 'react';
import './App.scss';
import { BrowserRouter as Router } from "react-router-dom";
import { ModalRoute, ModalContainer } from 'react-router-modal';
import { useForm, FormProvider } from "react-hook-form";

import { AuthProvider, useAuth, useFirestoreQuery } from './firebase'
import { Works, SectionFilter, SectionHeader, Section, ProtectedModalRoute, Loader, StudentCard, Fab, Anker } from "./components";
import { ModalContext } from './contexts';
import { ProjectsOverviewPage, StudentsOverviewPage, RegisterPage, AccountPage, UserNewProjectPage, ProjectDetailPage } from './pages';

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
    { label: 'alles', checked: true, abbr: null }
]

const AppWrapper = () => {
    const { user, noUserFound } = useAuth()
    const { data: coursesListData = [] } = useFirestoreQuery(fs => fs.collection('courses'))
    const { data: projectsData, refetch: refetchProjects } = useFirestoreQuery(fs => fs.collection('projects').limit(9))
    const { data: studentsData } = useFirestoreQuery(fs => fs.collection("users").where('role', '==', 'student').limit(12))
    const [ filter, setFilter ] = useState({ abbr: null });
    
    useEffect(() => {
        if (filter.abbr === null) refetchProjects()
        else {
            refetchProjects(fs => fs.collection('projects').where('course', '==', filter.id))
        }
    }, [filter])
    
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
                        onSelect={ setFilter }
                    />
                    <Section spacing="b"> 
                        {
                            projectsData?.length === 0 ?
                            <div>
                                <div className="label small text-center">Bekijk een ander vak</div>
                                <h3 className="text-center">Geen projecten gevonden</h3>
                            </div> : <Works data={ projectsData } />
                        }
                    </Section>
                    <SectionHeader actionLabel="ontdek ze allemaal" to="/studenten">onze &amp;<br/>studenten</SectionHeader>
                    <Section spacing="b"> 
                        <div className="student-list">
                            {
                                !studentsData ? <Loader /> : 
                                studentsData.map(s => 
                                    <StudentCard
                                        key={ s.id } 
                                        firstName={ s.firstName }
                                        lastName={ s.lastName } 
                                        avatar={ s.avatar }
                                    />
                                )
                            }
                        </div>
                    </Section>
                    { user ? <Fab label="account" href="/account"/> : null }
                </main>
            </div>
            <ModalRoute exact={ true } path={['/projecten']}><ProjectsOverviewPage /></ModalRoute>
            <ModalRoute exact={ true } path={['/projecten/:id']}><ProjectDetailPage /></ModalRoute>
            <ModalRoute exact={ true } path={['/studenten/:id']}><StudentsOverviewPage /></ModalRoute>
            <ModalRoute exact={ true } path={['/account/registreren']}><RegisterPage /></ModalRoute>
            <ProtectedModalRoute exact={ true } path={[ '/account' ]}><AccountPage /></ProtectedModalRoute>
            <ProtectedModalRoute exact={ true } path={['/account/projecten/nieuw']}><UserNewProjectPage /></ProtectedModalRoute>
            <ModalContainer/>
        </>
    )
}

export default App