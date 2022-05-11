import React, { useState, useEffect } from 'react';
import Editor from './Editor'
import LeanOut from './LeanOut'
import useLocalStorage from '../hooks/useLocalStorage'

function App() {
  const [stex, setsTex] = useLocalStorage('stex', '')
  const [lean, setLean] = useLocalStorage('lean', '')

  const [cursorPos, setCursorPos] = useState({line: 0, char: 0})

  const [leanOut, setLeanOut] = useState('')

  useEffect(() => {console.log(cursorPos);})

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
      <div className="notepad">
        <Editor
          language="stex"
          displayName="mArkdown"
          value={stex}
          onChange={setsTex}
        />
        <Editor
          language="lean"
          displayName="lean"
          value={lean}
          onChange={updateLean}
          onCursorChange={setCursorPos}
        />
        <div className="createnew"></div>
      </div>

      <div className="console-container">
        <LeanOut log={leanOut} />
      </div>
    </div>
  )
}

export default App;
