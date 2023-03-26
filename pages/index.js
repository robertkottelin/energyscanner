import React, { useState, useEffect } from 'react';

export default function Home() {
  const [electricityPrices, setElectricityPrices] = useState([]);

  const fetchElectricityPrices = async () => {
    const apiUrl = `https://www.elprisetjustnu.se/api/v1/prices/2023/03-26_SE3.json`;
    const proxyUrl = `http://localhost:8080/`; // Replace with the address of your proxy server
    const response = await fetch(proxyUrl + apiUrl, {
      method: 'GET',
    });

    if (response.ok) {
      const data = await response.json();
      setElectricityPrices(data);
      console.log(electricityPrices);
    } else {
      console.error('Error fetching electricity prices:', response.status, response.statusText);
    }
  };

  useEffect(() => {
    fetchElectricityPrices();
  }, []);

  return (
    <div>
      {electricityPrices.map((price, index) => (
        <div key={index}>
          <p>Start Time: {price.time_start}</p>
          <p>End Time: {price.time_end}</p>
          <p>Price (SEK/kWh): {price.SEK_per_kWh}</p>
          <p>Price (EUR/kWh): {price.EUR_per_kWh}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}
