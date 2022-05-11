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

export default function Editor(props) {
  const {
    language,
    displayName,
    value,
    onChange,
    onCursorChange
  } = props
  const [open, setOpen] = useState(true)

  function handleChange(editor, data, value) {
    onChange(value)
  }

  return (
    <div className={`editor-container ${open ? '' : 'collapsed'}`}>
      {language==='stex' && 
        <ReactMarkdown 
          children={value}
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]} />}
      <div className="editor-title">
        {displayName}
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
        onBeforeChange={handleChange}
        onCursorActivity={(editor) => {onCursorChange(editor.getDoc().getCursor())}}
        value={value}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          theme: 'material',
          lineNumbers: true
        }}
      />
      }
    </div>
  )
}
