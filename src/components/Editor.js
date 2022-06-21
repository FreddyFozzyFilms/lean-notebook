// Copyright (c) 2022 FreddyFozzyFilms. All rights reserved.
// Released under MIT license as described in the file LICENSE.
// Authors: Frederick Pu
// Defines the behavior & layout of each (code, text) cell.

import React, { useState } from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'

import 'codemirror/mode/xml/xml'

// latex code cell syntax highlighting
import 'codemirror/mode/stex/stex'
import 'codemirror/mode/markdown/markdown'

// for latex code cell rendering
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
// “React-katex,” npm. [Online]. Available: 
//     https://www.npmjs.com/package/react-katex. [Accessed: 07-May-2022]. 

// leanmode syntax highlighting
import './leanMode';

import { Controlled as ControlledEditor } from 'react-codemirror2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons'

import SettingsBar from './SettingsBar'

export default function Editor(props) {
  const {
    // content
    language,
    value,

    // content management functions
    onCellChange,
    onCursorChange,

    onNewCell,
    onCellDelete,

    id
  } = props
  const [open, setOpen] = useState(true)

  return (
    <div className="cell-container">
      <div className={`editor-container ${open ? '' : 'collapsed'}`}>
        {open && <SettingsBar changeMode={(mode) => (onCellChange(mode, value, id))} />}

        <div className="editor-title">
            <div>
              {language==='stex' && 
                <ReactMarkdown 
                  children={value}
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]} />}
            </div>

            <button
              type="button"
              className="expand-collapse-btn"
              onClick={() => setOpen(prevOpen => !prevOpen)}
            >
              <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
            </button>
        </div>

        {open && 
        <ControlledEditor
          onBeforeChange={(editor, data, value) => onCellChange(language, value, id)}
          onCursorActivity={(editor) => {
            const doc = editor.getDoc();
            const cursorInd = doc.indexFromPos(doc.getCursor());

            onCursorChange(cursorInd, id);
          }}
          value={value}
          className="code-mirror-wrapper"
          options={{
            lineWrapping: true,
            lint: true,
            mode: language,
            theme: 'material',
            lineNumbers: true
          }}

          resizable={false}
        />
        }

        {open &&
        <div className="add-cell-container">
          <button className="remove-cell" onClick={() => onCellDelete(id)}>-</button>
          <button className="add-cell" onClick={() => onNewCell(id + 1)}>+</button>
        </div>
        }
      </div>
    </div>
  )
}
