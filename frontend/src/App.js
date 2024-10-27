import React, { useState } from 'react';

function App() {
  const [suppliers, setsuppliers] = useState([]);
  const [error, setError] = useState(null);
  const [kwh, setKwh] = useState('');

  const searchSupplier = () => {
    if (isNaN(kwh) || kwh <= 0) {
      setError("Por favor, insira uma quantidade válida de kWh.");
      return;
    }

    fetch(`http://127.0.0.1:5000/supplier/recommend/${kwh}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao buscar os fornecedores');
        }
        return response.json();
      })
      .then((data) => {
        setsuppliers(data);
        setError(null); 
      })
      .catch((error) => setError(error.message));
  };


  return (
    <div className="App">
      <h1>Recomendações de Fornecedores</h1>
      <div>
        <input
          type="number"
          placeholder="Insira a quantidade de kWh"
          value={kwh}
          onChange={(e) => setKwh(e.target.value)}
        />
        <button onClick={searchSupplier}>Buscar</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {suppliers.map((supplier) => (
          <li key={supplier.name}>
            <h2>{supplier.name}</h2>
            <p><strong>Estado:</strong> {supplier.state_of_origin}</p>
            <p><strong>Custo por kWh:</strong> R$ {supplier.cost_per_kwh}</p>
            <p><strong>Limite Mínimo de kWh:</strong> {supplier.minimum_kWh_limit}</p>
            <p><strong>Número de Clientes:</strong> {supplier.total_clients}</p>
            <p><strong>Avaliação Média:</strong> {supplier.average_rating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
