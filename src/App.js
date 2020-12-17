import { useState } from 'react';
import './App.scss';
import Popup from 'reactjs-popup';

import { Container, FloatCard, Works, BoxModal } from "./components";

const App = () => {   
    const [ toggle, setToggle ] = useState(false);
    
    return (
        <div className="App">
            <header className="App-header">
                <BoxModal toggle={() => setToggle(!toggle)}>
                    <div>content</div>
                </BoxModal>
            </header>
            <main>
                
                <Works/>
            </main>
        </div>
    );
}

export default App