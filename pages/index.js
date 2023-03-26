import React, { useState, useEffect } from 'react';

export default function Home() {
  const [electricityPrices, setElectricityPrices] = useState([]);

  const fetchElectricityPrices = async (date) => {
    const year = date.slice(0, 4);
    const monthDay = date.slice(5);
    const apiUrl = `https://www.elprisetjustnu.se/api/v1/prices/${year}/${monthDay}_SE3.json`;
    const proxyUrl = `http://localhost:8080/`; // Replace with the address of your proxy server
    const response = await fetch(proxyUrl + apiUrl, {
      method: 'GET',
    });

    if (response.ok) {
      const data = await response.json();
      setElectricityPrices((prevState) => [...prevState, ...data]);
    } else {
      console.error('Error fetching electricity prices:', response.status, response.statusText);
    }
  };

  const getLastTenDays = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 10; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() - i);
      const dateString = currentDate.toISOString().slice(0, 10);
      dates.push(dateString);
    }
    return dates;
  };

  useEffect(() => {
    const dates = getLastTenDays();
    dates.forEach((date) => {
      fetchElectricityPrices(date);
    });
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Price (SEK/kWh)</th>
            <th>Price (EUR/kWh)</th>
          </tr>
        </thead>
        <tbody>
          {electricityPrices.map((price, index) => (
            <tr key={index}>
              <td>{price.time_start}</td>
              <td>{price.time_end}</td>
              <td>{price.SEK_per_kWh}</td>
              <td>{price.EUR_per_kWh}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}