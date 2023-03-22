import React, { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

const CoinInfo = ({ image, name, symbol }) => {
  const [price, setPrice] = useState(null);

// console.log(image, symbol)
  useEffect(() => {
    const getCoinPrice = async () => {
      const query = `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=${API_KEY}`;
      const response = await fetch(query);
      const json = await response.json();
      console.log(json)
      setPrice(json);
    };

    getCoinPrice().catch(console.error);
  }, [symbol]);

  // console.log(price)
  return (
    <div>
      {price ? ( // rendering only if API call actually returned us data
        <div>{price.USD}</div>
      ) : null}
      <li className="main-list" key={symbol}>
        <img
          className="icons"
          src={`https://www.cryptocompare.com${image}`}
          alt={`Small icon for ${name} crypto coin`}
        />
        {name} <span className="tab"></span> ${price.USD} USD
      </li>
    </div>
  );
};

export default CoinInfo;
