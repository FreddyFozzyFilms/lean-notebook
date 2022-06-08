import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

import Notebook from './components/Notebook';
import Gallery from './Gallery';

export default function App(){
    const [id, setId] = useState(null);

    return (
        <>
            <Gallery load={(id) => setId(id)}/>
            <Notebook notebookId={id}/>
        </>
    )
}