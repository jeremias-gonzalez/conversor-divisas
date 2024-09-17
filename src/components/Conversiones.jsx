import React, { useState, useEffect } from 'react';
import "../index.css"
const Conversiones = () => {
  const [dolar, setDolar] = useState([]); // Inicializamos como un array vacío
  const [error, setError] = useState(null);
  const [cantidad, setCantidad] = useState(''); // Estado para la cantidad que ingresa el usuario
  const [resultadoCompra, setResultadoCompra] = useState(null); // Resultado de la conversión (compra)
  const [resultadoVenta, setResultadoVenta] = useState(null); // Resultado de la conversión (venta)

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
  const manejarConversion = () => {
    if (dolar) {
      const compra = parseFloat(dolar.compra.replace(',', '.')); // Convertir el valor de compra a número
      const venta = parseFloat(dolar.venta.replace(',', '.')); // Convertir el valor de venta a número
      const monto = parseFloat(cantidad);

      if (!isNaN(monto)) {
        setResultadoCompra((monto / compra).toFixed(2));
        setResultadoVenta((monto * venta).toFixed(2));
      } else {
        setError("Por favor ingrese un número válido.");
      }
    }
  };

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : dolar.length > 0 ? (
        dolar.map((item, indice) => (
          <div key={indice} className='flex items-center justify-center '>
            <p className='montserrat uppercase'> dolar {item.casa}</p>
            <div className='flex'>
              
            <p className='montserrat mx-10 '>{item.compra} Compra</p>
            <div className=''>
            <label htmlFor="cantidad" className="block text-gray-700 font-semibold">Cantidad en Pesos:</label>
            <input
              id="cantidad"
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              placeholder="Ingresa cantidad en pesos"
            />
               <div className="flex justify-between">
            <button
              onClick={manejarConversion}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Convertir
            </button>
            {resultadoCompra && (
            <div className="mt-4">
              <p className="font-semibold">Resultado (Compra): ${resultadoCompra} USD</p>
              <p className="font-semibold">Resultado (Venta): ${resultadoVenta} USD</p>
            </div>
          )}
          </div>
          </div>

            <p className='montserrat mx-10'>{item.venta} Venta</p>
             <div className=''>
            <label htmlFor="cantidad" className="block text-gray-700 font-semibold">Cantidad en Pesos:</label>
            <input
              id="cantidad"
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              placeholder="Ingresa cantidad en pesos"
            />
               <div className="flex justify-between">
            <button
              onClick={manejarConversion}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Convertir
            </button>
            {resultadoCompra && (
            <div className="mt-4">
              <p className="font-semibold">Resultado (Compra): ${resultadoCompra} USD</p>
              <p className="font-semibold">Resultado (Venta): ${resultadoVenta} USD</p>
            </div>
          )}
          </div>
          </div>
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
