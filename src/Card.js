// Copyright (c) 2022 FreddyFozzyFilms. All rights reserved.
// Released under MIT license as described in the file LICENSE.
// Authors: Chevy Zhang, Frederick Pu
// Card Component for the notebook gallery.

import React, {useState, useEffect} from 'react';

// markdown
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default function Card(props){
    const {stexThumbnail, name, description, id, onClick} = props;

    return (
        <div className="card" onClick={onClick}>
            <div className="thumbnail">
                <ReactMarkdown 
                    children={stexThumbnail}
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]} />
            </div>

            <h2>{name}</h2>
            <p>{description}</p>
        </div>
    )
}