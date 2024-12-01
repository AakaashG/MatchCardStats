import './App.css';
import React, {useState} from 'react';

function App() {
  const [eventCode, setEventCode] = useState("fgdfgd");
  const [isLoading, setIsLoading] = useState(false);
  const [isEntered, setIsEntered] = useState(false);
  const [text, setText] = useState("");
  const [data, setData] = useState([]);

  const handleChange = ({target}) => {
    setText(target.value);
    setEventCode(target.value);
  }

  return (
    <div>
      <form onSubmit={(e)=> {
        e.preventDefault();
        setText("");
      }}>
        <input placeholder="Enter event code" value={text} onChange={handleChange}>
        </input>
        <button type="submit">Enter</button>
      </form>
      <h1>{eventCode}</h1>
      <table>
      </table>
    </div>
  );
}

export default App;
