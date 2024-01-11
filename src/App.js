import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Search from './components/Search';

function App() {

  //Data, input, and display function
  const [data, setData] = useState([]);
  const [input, setInput] = useState();
  const [result, setResult] = useState([]);
  let id = 1
  
  // Input handling
  const handleInput = (val) => {
    const res = val.target.value;
    setInput(res);
  }
  
  // Handle Click
  const handleClick = (click) => {
    click.preventDefault()
    if (input === "") {
      alert('Please input the correct season')
    }
    else {
      setResult(data.filter(i => i.season === input))
    }
  }
  console.log(result);
  
  // API
  useEffect(() => {
    const APIurl = 'https://ergast.com/api/f1/driverstandings/1.json?limit=74'
    axios.get(APIurl)
    .then (res => setData(res.data.MRData.StandingsTable.StandingsLists))
  .catch(err => console.log(err));
  }, []);

  // Main Page
  return (
    data.length === 0 ? 
      <div className='loading'>
        <span className=''>Loading....</span>
      </div>
      :
      
    <div className="App">
      <div className='f1-app'>
      <img src='/images/Race.jpg' alt=''/>
        <div className='container'>
          <img src='images/F1.png' alt=''/>
          <h1>Formula 1 World Champion History</h1>
          <p>By Felix Windriyareksa Hardyan</p>

          {/* Search component */}
          <Search handleInput={handleInput} handleClick={handleClick} />

          {/* mapping and array */}
          <div className="mapping">
          { result.map(i => { 
          return (
            <div key={id++} className="infoArray">

              {/* Championship info */}
              <div className='info'>
                <h2>{i.season} Season</h2>
                <h1>{i.DriverStandings[0].Driver.givenName + ' ' + i.DriverStandings[0].Driver.familyName}</h1>
                <h2>{i.DriverStandings[0].Constructors[0].name}</h2>
              </div>
              <div className='details'>
                <div className='col'>
                  <p>Points</p>
                  <p>{i.DriverStandings[0].points}</p>
                </div>
                <div className='col'>
                  <p>Wins</p>
                  <p>{i.DriverStandings[0].wins}</p>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;
