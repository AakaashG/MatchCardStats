import './App.css';
import React, {useState} from 'react';

function App() {
  const [eventCode, setEventCode] = useState("fgdfgd");
  const [isLoading, setIsLoading] = useState(false);
  const [isEntered, setIsEntered] = useState(false);
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);

  const handleChange = ({target}) => {
    setText(target.value);
    setEventCode(target.value);
  }

  const handleClick = ({target}) => {
    setIndex(index + parseInt(target.value));
  };

  const getData = async () => {
    setIsEntered(true);
    setIsLoading(true);
    try {
      const response = await fetch(`https://api.statbotics.io/v2/matches/event/${eventCode}`, {
      })
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }else {
        setData(await response.json());
        console.log(data);
      }
    } catch(error) {
      console.log(error);
    }finally {
      setIsLoading(false);
    }
  }
  
  const displayData = (index) => {
    console.log(data);
    let temp = data[index];
    console.log(temp);
    console.log("HELLO!");
    return (
      <>
      <tr>
        <th>Team Red</th>
        <th>{isLoading ? "Loading..." : temp.red_auto}</th>
        <th>{isLoading ? "Loading..." : temp.red_teleop}</th>
        <th>{isLoading ? "Loading..." : temp.red_endgame}</th>
        <th>{isLoading ? "Loading..." : temp.red_fouls}</th>
        <th>{isLoading ? "Loading..." : temp.red_fouls+temp.red_endgame+temp.red_teleop+temp.red_auto}</th>
      </tr>
      <tr>
        <th>Team Blue</th>
        <th>{isLoading ? "Loading..." : temp.blue_auto}</th>
        <th>{isLoading ? "Loading..." : temp.blue_teleop}</th>
        <th>{isLoading ? "Loading..." : temp.blue_endgame}</th>
        <th>{isLoading ? "Loading..." : temp.blue_fouls}</th>
        <th>{isLoading ? "Loading..." : temp.blue_fouls+temp.blue_endgame+temp.blue_teleop+temp.blue_auto}</th>
      </tr>
      </>
    )
  }

  return (
    <div>
      <form onSubmit={(e)=> {
        e.preventDefault();
        setText("");
        getData();
      }}>
        <input placeholder="Enter event code" value={text} onChange={handleChange}>
        </input>
        <button type="submit">Enter</button>
      </form>
      <h1>{eventCode}</h1>
      <div className="flex">
        <button 
        onClick={handleClick} 
        value={-1}
        disabled={index == 0 ? true : false}
        > left </button>
        <table>
          <tr>
            <th>Alliance</th>
            <th>Auto Score</th>
            <th>Teleop Score</th>
            <th>Endgame Score</th>
            <th>Fouls</th>
            <th>Total Score</th>
            <th>Net EPA</th>
            <th>Alliance</th>
          </tr>
          {isEntered ? <tbody>{displayData(index)}</tbody> : ''}
          
        </table>
        <button 
        onClick={handleClick} 
        value={1}
        disabled={index === data.length ? true : false}
        > right </button>
        <h1>{index}</h1>
      </div>
    </div>
  );
}

export default App;
