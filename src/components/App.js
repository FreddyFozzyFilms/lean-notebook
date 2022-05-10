import React, { useState, useEffect } from 'react';
import Editor from './Editor'
import useLocalStorage from '../hooks/useLocalStorage'

function App() {
  const [stex, setsTex] = useLocalStorage('stex', '')
  const [lean, setLean] = useLocalStorage('lean', '')

  const [leanOut, setLeanOut] = useState('')

  function updateLean(value) {
    let requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ code: value})
    };
    fetch("http://localhost:8000/api/leancompiler", requestOptions)
              .then(res => res.json())
              .then(data => setLeanOut(data.stdout));
    setLean(value);
  }
  return (
    <div className="app">
      <div className="pane top-pane">
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
          onChange={updateLean}
        />
        <div className="createnew"></div>
      </div>

      <div className="pane">
        <p>{leanOut}</p>
      </div>
    </div>
  )
}

export default App;
