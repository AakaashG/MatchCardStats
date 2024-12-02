import './App.css';
import React, {useState, useEffect} from 'react';
import YouTube from 'react-youtube';

function App() {
  const [eventCode, setEventCode] = useState("fgdfgd");
  const [isLoading, setIsLoading] = useState(true);
  const [isEntered, setIsEntered] = useState(false);
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [redTotal, setRedTotal] = useState(0);
  const [blueTotal, setBlueTotal] = useState(0);
  const [dateLoc, setDateLoc] = useState('');
  const [link, setLink] = useState();
  

  const handleChange = ({target}) => {
    setText(target.value);
    setEventCode(target.value);
  }

  const handleClick = ({target}) => {
    setIndex(index + parseInt(target.value));
  };

  const getData = async () => {
    setIsEntered(true);
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
  
  useEffect (() => {
    if (!isLoading) {
      let temp = data[index];
      setRedTotal(temp.red_fouls+temp.red_endgame+temp.red_teleop+temp.red_auto);
      setBlueTotal(temp.blue_fouls+temp.blue_endgame+temp.blue_teleop+temp.blue_auto);
      setDateLoc(temp.year+ ": Match #" + temp.match_number);
      setLink(temp.video)
    }
  }, [isLoading, index])

  const displayData = (index) => {
    console.log(data);
    let temp = data[index];
    console.log(temp);
    return (
      <>
      <tr className={redTotal>blueTotal ? "won red" : 'red'} >
        <th className={redTotal>blueTotal ? "won" : ''}>Team Red</th>
        <th>{isLoading ? "Loading..." : temp.red_auto}</th>
        <th>{isLoading ? "Loading..." : temp.red_teleop}</th>
        <th>{isLoading ? "Loading..." : temp.red_endgame}</th>
        <th>{isLoading ? "Loading..." : temp.red_fouls}</th>
        <th>{isLoading ? "Loading..." : redTotal}</th>
      </tr>
      <tr className={redTotal<blueTotal ? "won blue" : 'blue'}>
        <th>Team Blue</th>
        <th>{isLoading ? "Loading..." : temp.blue_auto}</th>
        <th>{isLoading ? "Loading..." : temp.blue_teleop}</th>
        <th>{isLoading ? "Loading..." : temp.blue_endgame}</th>
        <th>{isLoading ? "Loading..." : temp.blue_fouls}</th>
        <th>{isLoading ? "Loading..." : blueTotal}</th>
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
        
      }} style={{display: 'flex', justifyContent: 'center', marginTop: 20}}>
        <input placeholder="Enter event code" value={text} onChange={handleChange}>
        </input>
        <button type="submit">Enter</button>
      </form>
      {isEntered ?
      <>
      <h1 style={{display: 'flex', justifyContent: 'center'}}>{dateLoc}</h1>
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
          <tbody>{displayData(index)}</tbody>
        </table>
        <button 
        onClick={handleClick} 
        value={1}
        disabled={index === data.length ? true : false}
        > right </button>
        </div>
        <div className="flex" style={{marginTop: 50}}>
        <table>
        <tr>
          <th className='red'>{isLoading ? "Loading..." : "Red Team"}</th>
          <th className='blue'>{isLoading ? "Loading..." : "Blue Team"}</th>
        </tr>
        <tr>
          <th className='red'>{isLoading ? "Loading..." : data[index].red_1}</th>
          <th className='blue'>{isLoading ? "Loading..." : data[index].blue_1}</th>
        </tr>
        <tr>
          <th className='red'>{isLoading ? "Loading..." : data[index].red_2}</th>
          <th className='blue'>{isLoading ? "Loading..." : data[index].blue_2}</th>
        </tr>
        <tr>
          <th className='red'>{isLoading ? "Loading..." : data[index].red_3}</th>
          <th className='blue'>{isLoading ? "Loading..." : data[index].blue_3}</th>
        </tr>
      </table>
      <YouTube videoId={link} />
      </div>
      </>
      : ""}
      
    </div>
  );
}

export default App;
