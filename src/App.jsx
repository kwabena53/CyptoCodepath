import { useState, useEffect } from 'react'
import './App.css'
import CoinInfo from "./Components/CoinInfo";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {

  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {

    const fetchAllCoinData = async () => {
      const response = await fetch("https://min-api.cryptocompare.com/data/all/coinlist?&api_key" + API_KEY);
      const json = await response.json();
      console.log(json);
      setList(json);
    };

    //Calls functions and handles error
    fetchAllCoinData().catch(console.error);

  }, []);

  const searchItems = searchValue => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = Object.keys(list.Data).filter((item) => 
        Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(Object.keys(list.Data));
    }
  };
  
  return (
    <div className="whole-page">
      {/*<SideNav/>  remove sidenav due to api not working*/}
      <h1>My Crypto List</h1>
        <input
          type="text"
          placeholder="Search..."
          onChange={(inputString) => searchItems(inputString.target.value)}
        />
        <ul>
          {searchInput.length > 0
          ? filteredResults.map((coin, index) => 
                list.Data[coin].PlatformType === "blockchain" ? 
                <CoinInfo
                  image={list.Data[coin].ImageUrl}
                  name={list.Data[coin].FullName}
                  symbol={list.Data[coin].Symbol}
                  key={index}
                />
                : null
            )
          : list && Object.entries(list.Data).map(([coin], index) => 
                list.Data[coin].PlatformType === "blockchain" ? 
                <CoinInfo
                  image={list.Data[coin].ImageUrl}
                  name={list.Data[coin].FullName}
                  symbol={list.Data[coin].Symbol}
                  key={index}
                />
                : null
             )}
        </ul>
        

    </div>
  )
}

export default App
