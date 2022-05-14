import React, { useState, useEffect } from 'react';
import Editor from './Editor'
import LeanOut from './LeanOut'
import useLocalStorage from '../hooks/useLocalStorage'

function App() {
  //const [stex, setsTex] = useLocalStorage('stex', '')
  //const [lean, setLean] = useLocalStorage('lean', '')

  // cell = 
  // {
  //  mode: 'lean' or 'markdown'
  //  value: string
  //  id: int
  // }
  const [cells, setCells] = useState([
  {
     mode: 'lean',
     value: '#eval 2+2=4',
     id: 0
  }
  ]);

  //const [cursorInd, setCursorInd] = useState(0)
  const [cursorPos, setCursorPos] = useState({
    cursorInd: 0,
    cellId: 0
  })

  const [leanOut, setLeanOut] = useState('')

  useEffect(() => {
    console.log('yes')
    // get the substring ending at the cursor position
    const currentCell = cells[cursorPos.cellId];
    const lean = currentCell.value;
    const leanCut = lean.substring(0, cursorPos.cursorInd+1);

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
  }, [cursorPos])

  function updateCell(mode, value, id){
    const newCell = {
      mode: mode,
      value: value,
      id: id
    }
    setCells(prevCells => prevCells.map(cell => cell.id === id ? newCell : cell))
  }

  // create new cell located at the given id (insert)
  function createNewCell(id) {
    const emptyCell = {
      mode: 'lean',
      value: '',
      id: id
    }

    setCells(prevCells => {
      const newCells = [...prevCells]
      newCells.splice(id, 0, emptyCell);

      // set id's to proper value
      for (var i = 0; i < newCells.length; i++) {
        newCells[i].id = i;
      }
      return newCells;
    })
  }

  //console.log(cells)
  return (
    <div className="app">
      <div className="notepad">
        {cells.map((cell) => {
          return (
            <Editor
              language={cell.mode}
              value={cell.value}

              onCellChange={updateCell}
              onCursorChange={(cursorInd, id) => setCursorPos({cursorInd: cursorInd, cellId: id})}

              onNewCell={createNewCell}

              key={cell.id}
              id={cell.id}
            />
          )
        })}
      </div>

      <div className="console-container">
        <LeanOut log={leanOut} />
      </div>
    </div>
  )
}

export default App;
