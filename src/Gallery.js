import React, {useState, useEffect} from 'react';

export default function Gallery(props){

    return (
        <>
            <input type="text" name="name" onChange={(event)=>{props.load(event.target.value)}} />
        </>
    );
}