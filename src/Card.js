import React, {useState, useEffect} from 'react';

// markdown
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default function Card(props){
    const {stexThumbnail, name, description, id, onClick} = props;

    return (
        <div className="card" onClick={onClick}>
            <ReactMarkdown 
                children={stexThumbnail}
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]} />

            <h1>{name}</h1>
            <p>{description}</p>
            <p>{id}</p>
        </div>
    )
}