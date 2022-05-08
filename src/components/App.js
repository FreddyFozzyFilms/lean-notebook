import React, { useState, useEffect } from 'react';
import Editor from './Editor'
import useLocalStorage from '../hooks/useLocalStorage'

function App() {
  const [html, setHtml] = useLocalStorage('html', '')
  const [stex, setsTex] = useLocalStorage('stex', '')
  const [lean, setLean] = useLocalStorage('lean', '')

  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
        </html>
      `)
    }, 250)

    return () => clearTimeout(timeout)
  }, [html, stex, lean])

  return (
    <div className="app">
      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="stex"
          displayName="sTex"
          value={stex}
          onChange={setsTex}
        />
        <Editor
          language="lean"
          displayName="lean"
          value={lean}
          onChange={setLean}
        />
        <div className="createnew"></div>
      </div>

      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  )
}

export default App;
