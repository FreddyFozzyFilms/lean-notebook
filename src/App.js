import React, {useState, useEffect} from 'react';

import Notebook from './components/Notebook';
import Gallery from './Gallery';

export default function App(){
    const [id, setId] = useState(null);
    const [loaded, setLoaded] = useState(false);

    return (
        <>  
            { !loaded ?
                <Gallery 
                    load={(id) => {setId(id); setLoaded(true)}}
                /> 
                :
                <Notebook 
                    notebookId={id} 
                    back={()=>setLoaded(false)} 
                    del={(id) => {
                        fetch(`http://localhost:8000/api/notebook/delete/${id}`)
                                    .then(res => res.json())
                                    .then(data => console.log(data));
                        
                    }}    
                />
            }
        </>
    )
}