import React, {useState, useEffect} from 'react';

import Notebook from './components/Notebook';
import Gallery from './Gallery';

export default function App(){
    const [id, setId] = useState(null);
    const [loaded, setLoaded] = useState(false);

    return (
        <>  
            { !loaded ?
                <Gallery load={(id) => {setId(id); setLoaded(true)}}/> 
                :
                <div>
                    <button className="back" onClick={() => setLoaded(false)}>{"<-"}</button>
                    <Notebook notebookId={id} />
                </div>
            }
        </>
    )
}