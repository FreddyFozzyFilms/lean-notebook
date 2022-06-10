import React, {useState, useEffect} from 'react';
import bigplus from './images/BigPlus.png'

export default function NewCard(props){
    const {onClick} = props;

    return (
        <div className="card" onClick={onClick}>
            <img src={bigplus} alt="chevy has a small penis"/>
            <h2>Create New</h2>
        </div>
    )
}