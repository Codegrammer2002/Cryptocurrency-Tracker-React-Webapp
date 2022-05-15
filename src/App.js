import './App.css';
// We're using axios to transfer data gere
import axios from 'axios';
import React, {useState , useEffect} from "react";
import Coin from './Coin';

/*
This is our API
https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false

*/
// main component that is rendered in the index.js file.
function App() {
  // 
  const [coins , setCoins] = useState([]);
  const [search, setSearch] = useState('');
  // using UseEffect to track the api calls. the api
  useEffect(() =>{
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    ).then(res =>{
    setCoins(res.data);
    console.log(res.data);

    }).catch(error => console.log(error))
  }
  , [])

/*This is the handle changle function which changes the state of our search,
This is an arrow function. If confused, google arrow and anon functions
*/
 const handleChange = e =>{
   setSearch(e.target.value)
 }
 // We use this function to render the data on our webpage using the Coin component.
 const filteredCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()))
  return ( 
    <div className="App">
    <div className="coin-search"> 
    <h1 className='coin-text'> Search a currency</h1>
    <form>
      {/* Explanation of how the data is being rendered as the input fielc changes.
      We have a function here which is handle changle */}
      <input type = "text" placeholder='Search' className ="coin-input" onChange={handleChange}/> 
    </form>
    </div>   
       {/* This is how we're rendering the data in the Coin component
       We first provide the key which we get from the API. If we don't provide the key we get a warning from React
       */}
    {filteredCoins.map(coin =>{
      return (
        // coin acts as our 'props' here. And then if we want to get the variables/ other properties from the coin props 
        // we use the . to access them just like we do in Java.

        <Coin key ={coin.id}
         name ={coin.name} 
        image = {coin.image} 
        symbol ={coin.symbol}
        volume = {coin.total_volume}
        price = {coin.current_price}
        priceChange ={coin.price_change_percentage_24h}
        marketcap ={coin.market_cap}
         />


      );
    })}
    </div>
  );
}

export default App;
