import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

export default function Gallery(props){
    const [id, setId] = useState(null);

    return (
        <>
            <input type="text" name="name" onChange={(event)=>{props.load(event.target.value)}} />
        </>
    );
}