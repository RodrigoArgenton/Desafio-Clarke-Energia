import React, { useState } from 'react';
import SupplierCard from './components/supplierCard';
import './App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';


function App() {
  const [suppliers, setSuppliers] = useState([]);
  const [kwh, setKwh] = useState('');
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setKwh(event.target.value);

  };

  const fetchSuppliers = () => {
    fetch(`http://127.0.0.1:5000/supplier/recommend/${kwh}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching suppliers');
        }
        return response.json();
      })
      .then((data) => {
        setSuppliers(data);
        setError(null);
      })
      .catch((error) => setError(error.message));
  };

  return (
    <div className="App">
      <h1>Recomendação de fornecedores</h1>
      <div className="search-container">
        <TextField id="standard-basic" label="Quantidade de KWH" variant="standard" size="small" onChange={handleInputChange}/>
        <Button variant="text" onClick={fetchSuppliers} size='small'>Enviar</Button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="suppliers-list">
        {suppliers.map((supplier) => (
          <SupplierCard
            key={supplier.name}
            name={supplier.name}
            logo={supplier.logo}
            state_of_origin={supplier.state_of_origin}
            cost_per_kwh={supplier.cost_per_kwh}
            minimum_kWh_limit={supplier.minimum_kWh_limit}
            total_clients={supplier.total_clients}
            average_rating={supplier.average_rating}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
