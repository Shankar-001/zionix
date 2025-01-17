import './App.css';
import React, { useState } from 'react';
import { fetchMouserData, fetchRutronikData } from './action';

function App() {
  const [partNumber, setPartNumber] = useState('');
  const [quantity, setQuantity] = useState('');
  const [mouserPrice, setMouserPrice] = useState(null);
  const [rutronikPrice, setRutronikPrice] = useState(null);

  const fetchPrices = async () => {
    if (!partNumber || !quantity) {
      alert('Please enter part number and quantity');
      return;
    }

    try {
      const [mouserData, rutronikData] = await Promise.all([
        fetchMouserData(partNumber),
        fetchRutronikData(partNumber),
      ]);

      const price = getPriceForQuantity(mouserData, quantity);
      const price2 = getPriceFromRutronik(rutronikData, quantity);

      if (price) {
        setMouserPrice(price);
      } else {
        setMouserPrice(null);
        console.log('Price1 not found for the specified quantity');
      }

      if (price2) {
        setRutronikPrice(price2);
      } else {
        setRutronikPrice(null);
        console.log('Price2 not found for the specified quantity');
      }
    } catch (error) {
      console.error('Error fetching prices:', error);
      alert('Error fetching prices. Please try again later.');
    }
  };

  const getPriceForQuantity = (mouserData, quantity) => {
    const priceBreaks = mouserData?.SearchResults?.Parts[0]?.PriceBreaks;

    if (!priceBreaks || priceBreaks.length === 0) {
      return null;
    }

    for (let i = priceBreaks.length - 1; i >= 0; i--) {
      const priceBreak = priceBreaks[i];
      if (quantity == priceBreak.Quantity) {
        return priceBreak.Price;
      }
    }

    return null;
  };

  const getPriceFromRutronik = (rutronikData, quantity) => {
    const priceBreaks = rutronikData?.pricebreaks;

    if (!priceBreaks || priceBreaks.length === 0) {
      return null;
    }

    for (let i = priceBreaks.length - 1; i >= 0; i--) {
      const priceBreak = priceBreaks[i];
      if (quantity == parseInt(priceBreak.quantity)) {
        return priceBreak.price;
      }
    }

    return null;
  };

  const convertToINR = (priceInEuros) => {
    // Assuming 1 Euro = 88 Indian Rupees
    const exchangeRate = 88;
    return priceInEuros * exchangeRate;
  };

  return (
    <div className='container'>
      <h1>Part Price Checkerrrr</h1>
      <label>
        Part Number:
        <input
          type="text"
          value={partNumber}
          onChange={(e) => setPartNumber(e.target.value)}
        />
      </label>
      <label>
        Quantity:
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </label>
      <button onClick={fetchPrices}>Fetch Prices</button>

      <h2>Prices:</h2>
      <p>Mouser Price: {mouserPrice || 'NA'}</p>
      <p>
        Rutronik Price:{' '}
        {rutronikPrice ? `₹${convertToINR(rutronikPrice)}` : 'NA'}
      </p>
    </div>
  );
}

export default App;
