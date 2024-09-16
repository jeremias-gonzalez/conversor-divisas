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
          <div key={indice} className='flex items-center justify-center '>
            <p className='text'> dolar {item.casa}</p>
            <div className='col'>
            <p>COMPRA{item.compra}</p>
            <p>VENTA{item.venta}</p>
            </div>
          </div>
        ))
      ) : (
        <p>Cargando datos...</p> // Mientras se cargan los datos
      )}
    </div>
  );
};

export default Conversiones;
