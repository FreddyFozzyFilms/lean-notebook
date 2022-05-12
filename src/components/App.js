import React, { useState, useEffect } from 'react';
import Editor from './Editor'
import LeanOut from './LeanOut'
import useLocalStorage from '../hooks/useLocalStorage'

function App() {
  const [stex, setsTex] = useLocalStorage('stex', '')
  const [lean, setLean] = useLocalStorage('lean', '')

  const [cursorInd, setCursorInd] = useState(0)

  const [leanOut, setLeanOut] = useState('')

  useEffect(() => {
    // get the substring ending at the cursor position
    const leanCut = lean.substring(0, cursorInd+1);
    
    // close off any unclosed begin-end blocks
    const unclosedBeginEnd  = leanCut.lastIndexOf("begin") > leanCut.lastIndexOf("end");
    const leanDebug = unclosedBeginEnd ? leanCut + "end": leanCut;
    
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ code: leanDebug})
    };
    fetch("http://localhost:8000/api/leancompiler", requestOptions)
              .then(res => res.json())
              .then(data => setLeanOut(data.stdout));
  }, [lean, cursorInd])

  function updateLean(value) {
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
          onCursorChange={setCursorInd}
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
