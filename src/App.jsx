import { useState, useEffect } from 'react'
import './App.css'
import CoinInfo from "./Components/CoinInfo";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {

  const [list, setList] = useState(null)
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

 console.log(list)
  useEffect(() => {

    const fetchAllCoinData = async () => {
      const query = "https://min-api.cryptocompare.com/data/all/coinlist?&api_key"+ API_KEY
      const response = await fetch(query);
      const json = await response.json();
      setList(json);
    };

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
  <h1>My Crypto List</h1>
  <input
    type="text"
    placeholder="Search..."
    onChange={(inputString) => searchItems(inputString.target.value)}
  />
      <ul>
          {/* 
          
          {list && Object.entries(list.Data).map(([coin]) =>
          list.Data[coin].PlatformType === "blockchain" ? (
            <CoinInfo
            key={list.Data[coin].id}
            image={list.Data[coin].ImageUrl}
            name={list.Data[coin].FullName}
            symbol={list.Data[coin].Symbol}
            />
        ) : null
    )} 
    */}

    {searchInput.length > 0
          ? // what happens if we have search input? what list do we use to display coins?   
          filteredResults.map((coin)=>(
            <CoinInfo
            key={coin.id}
            image={coin.ImageUrl}
            name={coin.FullName}
            symbol={coin.Symbol}
            /> 
            // console.log(coin)
          ))
            
          : // what happens if we don't have search input? what list do we use to display coins? 
          list && Object.entries(list.Data).map(([coin]) =>list.Data[coin].PlatformType === "blockchain" ? (
            <CoinInfo
            key={list.Data[coin].id}
            image={list.Data[coin].ImageUrl}
            name={list.Data[coin].FullName}
            symbol={list.Data[coin].Symbol}
            />): null )         
          } 
      </ul>
</div>
  )
}

export default App
