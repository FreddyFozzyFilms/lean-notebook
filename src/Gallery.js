import React, {useState, useEffect} from 'react';

import Card from './Card'
import NewCard from './NewCard'

import banner from './images/Banner.png'

export default function Gallery(props){

    const {load} = props;

    const [notebooks, setNotebooks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/notebook/read")
                    .then(res => res.json())
                    .then(data => {setNotebooks(data.userdata)});
    }, [])

    console.log(notebooks)

    return (
        <>
        <div className="banner">
            <img src={banner} alt="banner" />
        </div>
        <div className="gallery">
            {notebooks.map((notebook) => (
                <Card
                    stexThumbnail={notebook.thumbnail}
                    name={notebook.name}
                    description={notebook.description}
                    id={notebook.id}
                    key={notebook.id}
                    onClick={() => load(notebook.id)}
                />
            ))}

            <NewCard onClick={() => load(notebooks.length)}/>
        </div>
        </>
    );
}