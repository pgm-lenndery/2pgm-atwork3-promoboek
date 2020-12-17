import { useState } from 'react';
import './App.scss';
import Popup from 'reactjs-popup';

import { Container, FloatCard, Works, BoxModal, SectionFilter } from "./components";
import { ModalContext } from './contexts';

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
    
    return (
        <ModalContext.Provider value={[ modal, setModal ]}>
            <div className="App">
                <header className="App-header">
                </header>
                <main>
                    <button onClick={ handleModal }>handleModal</button>
                    <SectionFilter label="filter projecten" options={ filterOptions } float={false} onSelect={option => console.log(option)}/>
                    <Works/>
                </main>
            </div>
            <BoxModal/>
        </ModalContext.Provider>
    );
}

export default App