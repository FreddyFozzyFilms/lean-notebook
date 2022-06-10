import React, {useState, useEffect} from 'react';

import Card from './Card'

export default function Gallery(props){

    const {load} = props;

    const [notebooks, setNotebooks] = useState([]); 

    useEffect(() => {
        fetch("http://localhost:8000/api/notebook/read")
                    .then(res => res.json())
                    .then(data => {setNotebooks(data.userdata)});
    })

    console.log(notebooks)

    return (
        <div>
            {notebooks.map((notebook) => (
                <Card
                    stexThumbnail={"$3^{i\pi}$"}
                    name={notebook.name}
                    description={"description"}
                    id={notebook.id}
                    onClick={() => load(notebook.id)}
                />
            ))}
        </div>
    );
}