import React, { useState, useEffect } from 'react';
import Editor from './Editor'
import LeanOut from './LeanOut'
import plus from '../images/Plus.png'

function App(props) {
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
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (saving) {
      const requestOptions = {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(
          {
            cells: cells, 
            name:prompt("name plz"), 
            thumbnail:prompt("latex thumbnail plz"), 
            description:prompt("description plz")
          }
        )
      };
      fetch(`http://localhost:8000/api/notebook/modify/${notebookId}`, requestOptions)
                .then(res => res.json())
                .then(data => console.log(data));

      setSaving(false);
    }
  }, [saving])

  const {notebookId, back} = props;
  useEffect(() => {
    fetch(`http://localhost:8000/api/notebook/read/${notebookId}`)
    .then((res) => res.json())
    .then((data) => {setCells(data.cells)})
  }, [notebookId])

  //const [cursorInd, setCursorInd] = useState(0)
  const [cursorPos, setCursorPos] = useState({
    cursorInd: 0,
    cellId: 0
  })

  const [leanOut, setLeanOut] = useState('')

  useEffect(() => {
    const currentCell = cells[cursorPos.cellId];

    // get the substring ending at the cursor position
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
      // add cell
      const newCells = [...prevCells]
      newCells.splice(id, 0, emptyCell);

      // set id's to proper value
      for (var i = 0; i < newCells.length; i++) {
        newCells[i].id = i;
      }
      return newCells;
    })
  }
  function pushNewCell(){
    setCells(prevCells => {
      const emptyCell = {
        mode: 'lean',
        value: '',
        id: prevCells.length
      }

      const newCells = [...prevCells]
      newCells.push(emptyCell);

      return newCells;
    })
  }
  function pushTopNewCell(){
    setCells(prevCells => {
      const emptyCell = {
        mode: 'lean',
        value: '',
        id: prevCells.length
      }

      const newCells = [...prevCells]
      newCells.splice(0, 0, emptyCell);

      return newCells;
    })
  }
  function deleteCell(id) {
    setCells(prevCells => {
      // remove cell
      const newCells = [...prevCells]
      newCells.splice(id, 1);

      // set id's to proper value
      for (var i = 0; i < newCells.length; i++) {
        newCells[i].id = i;
      }
      return newCells;
    })
  }

  console.log(cells)
  return (
    <div className="app">
      <div className="notepad">
        <div className="createnew" onClick={pushTopNewCell}>
          <img src={plus} alt="create new cell"/>
        </div>
        {cells.map((cell) => {
          return (
            <Editor
              language={cell.mode}
              value={cell.value}

              onCellChange={updateCell}
              onCursorChange={(cursorInd, id) => setCursorPos({cursorInd: cursorInd, cellId: id})}

              onNewCell={createNewCell}
              onCellDelete={deleteCell}

              key={cell.id}
              id={cell.id}
            />
          )
        })}
        <div className="createnew" onClick={pushNewCell}>
          <img src={plus} alt="create new cell"/>
        </div>
      </div>

      <div className="console-container">
        <button onClick={()=>{
          setSaving(true);
        }}
        className="save">Save</button>
        <button className="back" onClick={back}>{"<-"}</button>
        <LeanOut log={leanOut} />
      </div>
    </div>
  )
}

export default App;
