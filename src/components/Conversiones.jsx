import React, { useState, useEffect } from 'react';
import "../index.css"
const Conversiones = () => {
  const [dolar, setDolar] = useState([]); // Inicializamos como un array vacío
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://dolarapi.com/v1/dolares")
      .then(response => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        return response.json();
      })
      .then(data => setDolar(data))
      .catch(error => {
        console.error(error);
        setError(error.message);
      });
  }, []);

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : dolar.length > 0 ? (
        dolar.map((item, indice) => (
          <div key={indice} className='flex'>
            <p className='text'>{item.casa}</p>
            <p>{item.compra}</p>
            <p>{item.venta}</p>
          </div>
        ))
      ) : (
        <p>Cargando datos...</p> // Mientras se cargan los datos
      )}
    </div>
  );
};

export default Conversiones;
