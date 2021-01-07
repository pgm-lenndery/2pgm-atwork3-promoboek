import { useState } from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { ModalRoute, ModalContainer } from 'react-router-modal';

import { Container, FloatCard, Works, Modal, SectionFilter, SectionHeader } from "./components";
import { ModalContext } from './contexts';
import { ProjectPage } from './pages';

const App = () => {   
    const [ modal, setModal ] = useState(false);
    
    const handleModal = () => {
        setModal(<div>lel</div>)
    }
    
    const filterOptions = [
        {value: null, label: 'alles', checked: true},
        {value: 'cmo'},
        {value: 'gmb'},
        {value: 'nmd'},
        {value: 'avd'},
        {value: 'pgm'}
    ]
    
    /**
     * TODO: modal Route component
     */
    
    return (
        <Router basename="#!">
            <ModalContext.Provider value={[ modal, setModal ]}>
                <div className="App">
                    <header className="App-header">
                    </header>
                    <main>
                        <Link to="/modal-test">Open modal</Link>
                        <SectionHeader actionLabel="ontdek ze allemaal" to="/label">cases &amp;<br/>opdrachten</SectionHeader>
                        <SectionFilter label="filter projecten" items={ filterOptions } float={false} onSelect={option => console.log(option)}/>
                        <Works/>
                    </main>
                </div>
                <ModalRoute path={['/projecten/:id', '/project']} exact>
                    <ProjectPage />
                </ModalRoute>
                <ModalContainer/>
            </ModalContext.Provider>
        </Router>
    );
}

export default App