// Copyright (c) 2022 FreddyFozzyFilms. All rights reserved.
// Released under MIT license as described in the file LICENSE.
// Authors: Frederick Pu
// App component which allows pseudo page transitions between notebook and gallery.

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
                        
                        setLoaded(false)
                    }}    
                />
            }
        </>
    )
}