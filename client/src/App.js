import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
  
  const codeAreaRef = useRef();
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  
  const run = async () => {
    // const res = await axios.post("http://localhost:5001/run", {content: code, language: "python"});
    const res = await axios.post("/run", {content: code, language: "python"});
    setResult(res.data);
  }

  return (
    <div className="page">
      <h3 className="title">Viz Online</h3>
        <div className="container">
          <textarea className="textArea"
            rows="20"
            cols="75"
            value={code}
            ref={codeAreaRef}
            onChange={(e) => {
              setCode(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key == 'Tab') {
                e.preventDefault();
                const { selectionStart, selectionEnd } = e.target;
                const newText = code.substring(0, selectionStart) + '    ' + code.substring(selectionEnd, code.length);
                codeAreaRef.current.focus();
                codeAreaRef.current.value = newText;
                codeAreaRef.current.setSelectionRange(selectionStart + 4, selectionEnd + 4);
                setCode(newText);
              }
            }}
          />
          <textarea className="textArea"
            rows="20"
            cols="75"
            value={result}
            disabled={true}
          />
        </div>
        <button className="run-btn" onClick={run}>Run</button>
    </div>
  );
}

export default App;
