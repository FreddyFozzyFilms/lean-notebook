import React, { useState, useEffect } from 'react';
import Editor from './Editor'
import LeanOut from './LeanOut'
import useLocalStorage from '../hooks/useLocalStorage'

function App() {
  const [stex, setsTex] = useLocalStorage('stex', '')
  const [lean, setLean] = useLocalStorage('lean', '')

  const [cursorPos, setCursorPos] = useState({line: 0, char: 0})

  const [leanOut, setLeanOut] = useState('')

  useEffect(() => {
    // the substring of lean code sent to the leanAPI
    // basically string from start to the cursor (with some begin end blocks added back in)
    const lines = lean.split('\n')
    const linesToCursor = lines.map((line, index) =>  
    {
      if (index < cursorPos.line){
        return line;
      }else if (index === cursorPos.line){
        return line.substring(0, cursorPos.char+1);
      }else{
        return "";
      }
    })
    const leanCut = linesToCursor.join("\n");
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
  }, [lean, cursorPos])

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
