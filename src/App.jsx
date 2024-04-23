import React, { useState, useEffect } from 'react';

const App = () => {
  const [distance, setDistance] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow"
        };

        const response = await fetch("https://backcesar-production.up.railway.app/sensor-data", requestOptions);

        if (!response.ok) {
          throw new Error('Error al obtener los datos del sensor');
        }

        const data = await response.json();

        if (data && data.length > 0) {
          const latestData = data[data.length - 1];
          setDistance(latestData.distance);
        } else {
          setError('No se recibieron datos del sensor');
        }
      } catch (error) {
        setError('Error al obtener los datos del sensor');
      }
    };

    fetchSensorData();

    const intervalId = setInterval(fetchSensorData, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>Proximity Sensor App</h1>
      {distance !== null ? (
        <p>Distancia del sensor: {distance} cm</p>
      ) : (
        <p>{error || 'Cargando...'}</p>
      )}
    </div>
  );
};

export default App;
